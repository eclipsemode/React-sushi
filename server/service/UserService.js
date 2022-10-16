const { User, Basket } = require('../models/models');
const MailService = require('./MailService');
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenService = require('./TokenService');
const UserDto = require('../dtos/UserDto');
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
    const basket = await Basket.create({userId: user.id});
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    }
  }

  async login({ email, password }, next) {
    const user = await User.findOne({where: {email}});

    if (!user) {
      return next(ApiError.internal('Пользователь с таким email не найден.'))
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль.'))
    }
    const token = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );

    return token;
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async auth({ id, email, role }) {
    const token = jwt.sign(
      {id, email, role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return token;
  }

  async getUserData({ id }) {
    const user = await User.findOne({ where: { id } });
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