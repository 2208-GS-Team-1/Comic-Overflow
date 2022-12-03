const db = require("./db");
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Review = require("./Review");

// ASSOCIATIONS HERE!

// Cart + User
Cart.belongsTo(Book);
User.hasMany(Cart);

// Cart + Book
Cart.belongsTo(Book);
Book.hasMany(Cart);

// Reviews
Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  User,
  db,
  Book,
  Review,
  Cart,
};
