const { Category } = require("../models/models");

class CategoryService {
  async create({ name }) {
    const category = await Category.create({name});
    return category;
  }

  async getAll() {
    const categories = await Category.findAll();
    return categories;
  }

  async delete(id) {
    await Category.destroy({
      where: { id }
    })
    return 'Deleted successfully';
  }
}

module.exports = new CategoryService();