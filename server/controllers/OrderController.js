const ApiError = require('../error/ApiError');
const OrderService = require('../service/OrderService');

class OrderController {
  async create(req, res, next) {
    const { userId, products  } = req.body;
    return res.json({userId, products});
  }
}

module.exports = new OrderController();