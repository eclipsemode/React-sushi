const { User, Order, Product } = require('../models/models');
const ApiError = require("../error/ApiError");

class OrderService {
  async create(userId, orderProducts, totalPrice) {
    const order = await Order.create({userId, orderProducts, totalPrice})
    return order;
  }

  async getAll() {
    const orders = await Order.findAll()
    return orders;
  }
}

module.exports = new OrderService();