const { Sequelize } = require("sequelize");
const db = require("./db");

const Order = db.define("order", {
  // Date and time of when the order was placed
  timeOfCheckOut: {
    type: Sequelize.DATE,
    allowNull: true, // If an order is not checked out, it has a NULL checkOutTime.
  },

  // An enum that can be used so a user can check how far along their order is coming.
  orderStatus: {
    type: Sequelize.ENUM("pending", "shipped", "delivered", "returned"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "pending",
  },

  // The Order's total price -
  // this would be equal to the sum of its cart item's priceTimesQuantityAtCheckout
  // Stored as INT for accurate addition (math gets weird with decimals)
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Don't allow a negative price
    },
    // GETTER: Decided to handle its display on frontend
  },
});

module.exports = Order;
