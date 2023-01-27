const ApiError = require('../error/ApiError');
const OrderService = require('../service/OrderService');

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, orderProducts, totalPrice  } = req.body;
      const order = await OrderService.create(userId, orderProducts, totalPrice);
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest('Невозможно создать заказ.'))
    }
  }

  async getAll(req, res, next) {
    try {
    const orders = await OrderService.getAll();
    return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest('Ошибка.'))
    }
  }
}

module.exports = new OrderController();