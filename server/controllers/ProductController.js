const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require('uuid');
const path = require('path');

class ProductController {
  async create(req, res, next) {
    try {
      const { name, price, description, categoryId } = req.body;
      const { image } = req.files;
      let fileName = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
      const product = await Product.create({ name, price, description, categoryId, image: fileName });
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
    const products = await Product.findAll();
    return res.json(products);
  }
}

module.exports = new ProductController();