const db = require("./db");
const User = require("./User");
const seed = require("./seed");
const Book = require("./Book");
const Cart = require("./Cart");
const Review = require("./Review");

// ASSOCIATIONS HERE!
Cart.hasMany(User);
User.belongsTo(Cart);

Cart.belongsToMany(Book, { through: "CartBooks" });
Book.belongsToMany(Cart, { through: "CartBooks" });

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = {
  seed,
  User,
  db,
  Book,
  Review
};
