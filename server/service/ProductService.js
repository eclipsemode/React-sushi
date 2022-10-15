const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models");

class ProductService {
  async create({ name, price, description, categoryId, rating }, image, next) {

      if (+rating > 10 || rating < 1) {
        return next(ApiError.badRequest("Неверные значения рейтинга."));
      }

      let fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));
      const product = await Product.create({ name, price, description, rating, categoryId, image: fileName });

      return product;
  }

  async delete(id) {
    await Product.destroy({
      where: { id }
    });
    return "Deleted successfully";
  }

  async getAll({ categoryId, sortBy, sortOrder }, next) {
      let products;
      if (categoryId) {
        if (!sortBy || !sortOrder) next(ApiError.badRequest("Не указана сортировка."));
        products = await Product.findAll({
          where: { categoryId },
          order: [
            [sortBy, sortOrder]
          ]
        });
      } else {
        products = await Product.findAll();
      }
      return products;
  }
}

module.exports = new ProductService();