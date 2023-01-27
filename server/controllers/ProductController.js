const ApiError = require("../error/ApiError");
const ProductService = require('../service/ProductService');

class ProductController {
  async create(req, res, next) {
    try {
      const product = await ProductService.create(req.body, req.files.image, next)
      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res, next) {
    try {
      const result = await ProductService.delete(req.params.id)
      return res.status(200).json( result);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { sortBy } = req.query;
      const products = await ProductService.getAll(req.query, next)
      return res.json(sortBy === 'rating' ? products.reverse() : products);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();