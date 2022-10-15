const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  dateOfBirth: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING },
  tel: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING },
  house: { type: DataTypes.STRING },
  floor: { type: DataTypes.STRING },
  entrance: { type: DataTypes.STRING },
  room: { type: DataTypes.STRING },
  isActivated: {type: DataTypes.BOOLEAN, default: false},
  activationLink: {type: DataTypes.STRING},
});

const Token = sequelize.define('token', {
  userRef: {type: DataTypes.INTEGER},
  refreshToken: {type: DataTypes.STRING, required: true},
})

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 1 },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

User.hasOne(Basket);
Basket.belongsTo(User);

Token.hasOne(User);
User.hasOne(Token);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Basket,
  BasketProduct,
  Product,
  Category,
  Token
};