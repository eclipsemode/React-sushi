const ApiError = require('../error/ApiError');
const OrderService = require('../service/OrderService');

class OrderController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const order = await OrderService.create(data);
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
    const orders = await OrderService.getAll();
    return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest('Произошла ошибка.'))
    }
  }

  async getAllByUserId(req, res, next) {
    try {
      const { id } = req.body;
      const orders = await OrderService.getAllByUserId(id);
      return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest('Произошла ошибка.'))
    }
  }
}

module.exports = new OrderController();