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
    get() {
      // GETTER - capitalize the first letter of each 'word'
      // nagai go --> Nagai Go      redjuice --> Redjuice
      // guillermo del toro --> Guillermo Del Toro
      const rawValue = this.getDataValue("author");

      //if this field is null, just return null
      if (!rawValue) return null;

      // if the author is only one chr, return that capitalized.
      if (rawValue.length <= 1) return rawValue.toUpperCase();

      // Else, capitalize the first letter of each 'word'
      const words = rawValue.split(" ");

      // map through words and capitalize each word's first letter only
      const capitalizedWords = words.map(word => {
        const firstLetterCapitalized = word[0].toUpperCase();
        const restOfLetters = word.slice(1);
        return firstLetterCapitalized + restOfLetters;
      });

      // join our words back into a string with spaces and we're done.
      return capitalizedWords.join(" ");
    },
    set(value) {
      // SETTER - store as all lowercase
      const sanitized = value.toLowerCase();
      this.setDataValue("author", sanitized);
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
      // slice of life --> Slice of life
      const rawValue = this.getDataValue("genre");

      //if this field is null, just return null
      if (!rawValue) return null;

      // if the genre is only one chr, return that capitalized.
      if (rawValue.length <= 1) return rawValue.toUpperCase();
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

  // EG) Standard, Limited, Deluxe, First Press...
  edition: {
    type: Sequelize.STRING,
    get() {
      // GETTER - capitalize the first letter
      // full color edition --> Full color edition
      const rawValue = this.getDataValue("edition");

      //if this field is null, just return null
      if (!rawValue) return null;

      // if the edition is only one chr, return that capitalized.
      if (rawValue.length <= 1) return rawValue.toUpperCase();
      // Else, capitalize just the first letter.
      const firstLetterCapitalized = rawValue[0].toUpperCase();
      const restOfLetters = rawValue.slice(1);
      return firstLetterCapitalized + restOfLetters;
    },
    set(value) {
      // SETTER - store as all lowercase
      const sanitized = value.toLowerCase();
      this.setDataValue("edition", sanitized);
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
