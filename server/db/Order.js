const { Sequelize } = require("sequelize");
const db = require("./db");

const Order = db.define("order", {
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

module.exports = Order;
