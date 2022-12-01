const db = require("./db");
const User = require("./User");
const seed = require("./seed");
const Book = require("./Book");
const Cart = require("./Cart");
// ASSOCIATIONS HERE!
Cart.hasMany(User);
User.belongsTo(Cart);

Cart.belongsToMany(Book, { through: "CartBooks" });
Book.belongsToMany(Cart, { through: "CartBooks" });

module.exports = {
  seed,
  User,
  db,
  Book,
};
