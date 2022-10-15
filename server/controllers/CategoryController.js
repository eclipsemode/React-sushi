const ApiError = require('../error/ApiError');
const CategoryService = require('../service/CategoryService');

class CategoryController {
  async create(req, res, next) {
    try {
      const category = await CategoryService.create(req.body)
      return res.json(category);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const categories = await CategoryService.getAll();
      return res.json(categories);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const result = await CategoryService.delete(req.params.id)
      return res.status(200).json( result );
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoryController();