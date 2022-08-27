const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
  async create(req, res) {
    const { name } = req.body;
    const category = await Category.create({name});
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async delete(req, res) {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({message: 'Deleted successfully'});
  }
}

module.exports = new CategoryController();