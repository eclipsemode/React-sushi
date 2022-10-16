const ApiError = require("../error/ApiError");
const UserService = require("../service/UserService");

class UserController {
  async registration(req, res, next) {
    try {
      const user = await UserService.registration(req.body, next);
      res.cookie("refreshToken", user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(user);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
        await UserService.activate(activationLink, next);
        return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
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