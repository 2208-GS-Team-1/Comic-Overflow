const { Sequelize } = require("sequelize");
const db = require("./db");

const Review = db.define("review", {
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
});

module.exports = Review;
