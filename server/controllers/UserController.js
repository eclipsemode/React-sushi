const ApiError = require("../error/ApiError");
const UserService = require("../service/UserService");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Ошибка валидации.", errors.array()));
      }
      const user = await UserService.registration(req.body, next);
      return res.json("Confirm registration.");
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink, next);
      return res.redirect(process.env.CLIENT_URL + `/activate/${activationLink}`);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const user = await UserService.login(req.body, next);
      res.cookie("refreshToken", user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json({ user });
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json("Successfully logged out.");
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refreshToken(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getUserData(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await UserService.getUserData(refreshToken);
      return res.json(user);
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

  async changeUsersEmail(req, res, next) {
    try {
      await UserService.changeUsersEmail(req.body, next);
      return res.status(200).send("Successfully changed.");
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new UserController();