const { Sequelize } = require("sequelize");
const db = require("./db");

const CartItem = db.define("cartItem", {
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  orderStatus: {
    type: Sequelize.ENUM(
      "not checked out",
      "pending",
      "shipped",
      "delivered",
      "returned"
    ),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "not checked out",
  },
});

module.exports = CartItem;
