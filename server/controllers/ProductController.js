const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require('uuid');
const path = require('path');

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, description, categoryId, rating } = req.body;
      const { image } = req.files;
      let fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
      const product = await Product.create({ name, price, description, rating, categoryId, image: fileName });
      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async delete(req, res) {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({message: 'Deleted successfully'});
  }

  async getAll(req, res) {
    const { categoryId, sortType, sortOrder } = req.query;
    let products;
    if (categoryId) {
      products = await Product.findAll({ where: { categoryId } });
    } else {
      products = await Product.findAll();
    }
    return res.json(products);
  }
}

module.exports = new ProductController();