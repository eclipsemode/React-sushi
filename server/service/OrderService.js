const { User, Order, Product } = require('../models/models');
const ApiError = require("../error/ApiError");

class OrderService {
  async create(data) {
    const order = await Order.create({...data})
    return order;
  }

  async getAll() {
    const orders = await Order.findAll()
    return orders;
  }
}

module.exports = new OrderService();