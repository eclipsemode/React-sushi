const { User, Token } = require('../models/models');
const MailService = require('./MailService');
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const TokenService = require('./TokenService');
const UserDto = require('../dto/UserDto');
const uuid = require('uuid');

class UserService {
  async registration({ email, password, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room }, next) {

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль.'))
    }

    if (!name) {
      return next(ApiError.badRequest('Введите имя.'))
    }

    if (!tel) {
      return next(ApiError.badRequest('Введите телефон.'))
    }

    const candidateEmail = await User.findOne( { where: { email } } );
    const candidateTel = await User.findOne({ where: { tel } });

    if (candidateEmail) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
    }

    if (candidateTel) {
      return next(ApiError.badRequest('Пользователь с таким номером телефона уже существует.'))
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = await uuid.v4();
    const user = await User.create({email, password: hashPassword, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room, activationLink});
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink, next) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      return next(ApiError.badRequest('Неккоректная ссылка активации.'));
    }
    await User.update({ isActivated: true, activationLink: null }, { where: { activationLink } });
  }

  async login({ email, password }, next) {
    const user = await User.findOne({where: {email}});

    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким email не найден.'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль.'))
    }

    const checkActivated = user.isActivated;

    if (!checkActivated) {
      return next(ApiError.badRequest('Аккаунт не активирован, проверьте почту.'))
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorized();
    }

    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async getUserData(token) {
    const { userId } = await TokenService.findToken(token);
    const user = await User.findOne({ where: { id: userId } });
    return user;
  }

  async patchUserData({ id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room }, next) {
      const user = await User.findOne({ where: { id } });

      const userData = {
        id: user.id,
        password: user.password,
        email: email,
        name: name,
        surname: surname,
        dateOfBirth: dateOfBirth,
        tel: tel,
        street: street,
        house: house,
        floor: floor,
        entrance: entrance,
        room: room
      };

      await User.update(userData, { where: { id } })

      return userData;
  }

  async changeUsersEmail( {email, id}, next ) {
    const candidateEmail = await User.findOne( { where: { email } } );
    const user = await User.findOne({ where: { id } })

    if (candidateEmail) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
    }

    const activationLink = await uuid.v4();

    const userData = {
      email,
      activationLink,
      isActivated: false
    }

    await User.update(userData, { where: { id } });

    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

  }
}

module.exports = new UserService();