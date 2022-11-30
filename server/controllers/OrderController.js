const ApiError = require('../error/ApiError');

class OrderController {
  async create(req, res, next) {
    return res.json({message: 'Hello'});
  }
}

module.exports = new OrderController();