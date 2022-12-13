const { Sequelize } = require("sequelize");
const db = require("./db");

const Book = db.define("book", {
  //field
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    type: Sequelize.STRING,
    // allowNull: false,
    // validate: {
    // 	notEmpty: true,
    // }
  },
  volume: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  yearOfPublish: {
    type: Sequelize.DATEONLY,
  },
  isbn: {
    type: Sequelize.STRING,
    unique: true, // can this be unique if we allow null?
  },

  // EG) Standard, Limited, Deluxe
  edition: {
    type: Sequelize.STRING,
    get() {
      const current = this.getDataValue("edition");
      if (current) return current[0].toUpperCase() + current.slice(1);
      else return "";
    },
  },
  imageURL: {
    type: Sequelize.STRING,
  },

  // Stored as INT for accurate addition (math gets weird with decimals)
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Don't allow a negative price
    },
    // GETTER: Decided to handle its display on frontend
  },

  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Don't allow a negative stock
    },
  },

  isDeactivated: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Book;
