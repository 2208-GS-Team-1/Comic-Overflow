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
  priceAtCheckOut: {
    type: Sequelize.INTEGER,
    allowNull: true, // This field is only filled out upon checkout, so null before then is ok.
  },
  timeOfCheckOut: {
    type: Sequelize.DATE,
    allowNull: true, // If an order is not checked out, it has a NULL checkOutTime.
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
