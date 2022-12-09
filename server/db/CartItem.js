const { Sequelize } = require("sequelize");
const db = require("./db");

const CartItem = db.define("cartItem", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  priceTimesQuantityAtCheckOut: {
    type: Sequelize.INTEGER,
    allowNull: true, // This field is only filled out upon checkout, so null before then is ok.
  },
});

module.exports = CartItem;
