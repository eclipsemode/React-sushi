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
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING }
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  refreshToken: { type: DataTypes.STRING, required: true }
});

const Order = sequelize.define("order", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false, totalAmount: true }
  },
  {
    timestamps: true
  });

// const OrderProduct = sequelize.define("order_product", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     orderId: { type: DataTypes.INTEGER, allowNull: false },
//     productId: { type: DataTypes.INTEGER, allowNull: false, amount: true }
//   },
//   {
//     timestamps: true
//   });

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 1 },
  description: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false }
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

Order.hasMany(Product);
Product.belongsTo(Order);

// Product.hasMany(Order);
// OrderProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

module.exports = {
  User,
  Order,
  // OrderProduct,
  Product,
  Category,
  Token
};