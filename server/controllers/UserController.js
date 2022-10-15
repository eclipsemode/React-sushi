const ApiError = require("../error/ApiError");
const UserService = require("../service/UserService");

class UserController {
  async registration(req, res, next) {
    try {
      const user = await UserService.registration(req.body, next);
      res.cookies("refreshToken", user.refreshToken, {});
      return res.json(user);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
    // const  { email, password, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room } = req.body;
    //
    // if (!email || !password) {
    //   return next(ApiError.badRequest('Некорректный email или пароль.'))
    // }
    //
    // if (!name) {
    //   return next(ApiError.badRequest('Введите имя.'))
    // }
    //
    // if (!dateOfBirth.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)) {
    //   return next(ApiError.badRequest('Неверный формат даты.'))
    // }
    //
    // if (!tel) {
    //   return next(ApiError.badRequest('Введите телефон.'))
    // }
    //
    // const candidate = await User.findOne( { where: { email } } );
    //
    // if (candidate) {
    //   return next(ApiError.badRequest('Пользователь с таким email уже существует.'))
    // }
    //
    // const hashPassword = await bcrypt.hash(password, 5);
    // const activationLink = uuid.v4();
    // const user = await User.create({email, password: hashPassword, role, name, surname, dateOfBirth, tel, street, house, floor, entrance, room, activationLink});
    // const basket = await Basket.create({userId: user.id});
    // await MailService.sendActivationMail(email, activationLink);
    // const token = jwt.sign(
    //   {id: user.id, email: user.email, role: user.role},
    //   process.env.SECRET_KEY,
    //   {expiresIn: '24h'}
    // );
    // return res.json({token})
  }

  async login(req, res, next) {
    try {
      const token = await UserService.login(req.body, next);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async logout(req, res, next) {
    try {

    } catch (e) {

    }
  }

  async auth(req, res, next) {
    try {
      const token = UserService.auth(req.user);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getUserData(req, res, next) {
    try {
      const user = await UserService.getUserData(req.body);
      return res.json({ user });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async patchUserData(req, res, next) {
    try {
      const user = await UserService.patchUserData(req.body, next);
      return res.json({ user });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();