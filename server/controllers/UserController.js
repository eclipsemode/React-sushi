const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket} = require('../models/models');

class UserController {
  async registration(req, res, next) {
    const  { email, password, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room } = req.body;

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
    const user = await User.create({email, password: hashPassword, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room});
    const basket = await Basket.create({userId: user.id});
    const token = jwt.sign(
      {id: user.id, email: user.email, role: user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return res.json({token})
  }

  async login(req, res, next) {
    const { email, password } = req.body;
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

    return res.json({token});
  }

  async auth(req, res) {
    const token = jwt.sign(
      {id: req.user.id, email: req.user.email, role: req.user.role},
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    );
    return res.json({token})
  }

  async getUserData(req, res) {
    const { id } = req.body;
    const user = await User.findOne({ where: { id } })
    return res.json({user})
  }

  async patchUserData(req, res, next) {
    try {
      const { id, email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room } = req.body;
      let user = await User.findOne({ where: { id } });
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
      }
      const newUser = await User.update(userData, { where: { id } })
       return res.json('Информаиця обновлена.')
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new UserController();