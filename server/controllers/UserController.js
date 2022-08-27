const ApiError = require('../error/ApiError');

class UserController {
  async registration(req, res) {

  }

  async login(req, res) {

  }

  async auth(req, res, next) {
    const query = req.query;
    if (!query.message) {
      return next(ApiError.badRequest('Не задано сообщение'));
    }
    res.json(query.message);
  }
}

module.exports = new UserController();