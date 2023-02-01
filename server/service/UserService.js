const { User } = require('../models/models');
const MailService = require('./MailService');
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    if (!dateOfBirth.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)) {
      return next(ApiError.badRequest('Неверный формат даты.'))
    }

    if (!tel) {
      return next(ApiError.badRequest('Введите телефон.'))
    }

    const candidate = await User.findOne( { where: { email } } );

    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
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
    const user = User.findOne({ where: { activationLink } });
    if (!user) {
      return next(ApiError.badRequest('Неккоректная ссылка активации.'));
    }
    await User.update({ isActivated: true }, { where: { activationLink } });
  }

  async login({ email, password }, next) {
    const user = await User.findOne({where: {email}});

    if (!user) {
      return next(ApiError.badRequest('Пользователь с таким email не найден.'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль.'))
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

  async auth({ id, role, name, surname }) {
    const token = jwt.sign(
      {id, role, name, surname},
      process.env.SECRET_KEY_ACCESS,
      {expiresIn: '24h'}
    );
    return token;
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
        email: email || user.email,
        name: name || user.name,
        surname: surname || user.surname,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
        tel: tel || user.tel,
        street: street || user.street,
        house: house || user.house,
        floor: floor || user.floor,
        entrance: entrance || user.entrance,
        room: room || user.room
      };

      await User.update(userData, { where: { id } })

      return userData;
  }
}

module.exports = new UserService();