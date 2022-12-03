const db = require("./db");
const User = require("./User");
const Book = require("./Book");
const CartItem = require("./CartItem");
const Review = require("./Review");

// ASSOCIATIONS HERE!

// CartItem + User
CartItem.belongsTo(User);
User.hasMany(CartItem);

// Cart + Book
CartItem.belongsTo(Book);
Book.hasMany(CartItem);

// Reviews
Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  db,
  User,
  Book,
  Review,
  CartItem,
};
