const { Sequelize } = require("sequelize");
const db = require("./db");

const Book = db.define("book", {
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
    get() {
      // GETTER - capitalize the first letter
      const rawValue = this.getDataValue("genre");

      //if this field is null, just return null
      if (!rawValue) return null;

      // if the genre is only one chr, return that capitalized.
      if (rawValue.length < 1) return rawValue.toUpperCase();
      const firstLetterCapitalized = rawValue[0].toUpperCase();
      const restOfLetters = rawValue.slice(1);
      return firstLetterCapitalized + restOfLetters;
    },
    set(value) {
      // SETTER - store as all lowercase
      const sanitized = value.toLowerCase();
      this.setDataValue("genre", sanitized);
    },
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
