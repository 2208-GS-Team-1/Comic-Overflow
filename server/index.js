const app = require("./app");
const { User, Cart, Book, Review } = require("./db");
const seed = require("./db/seed");

const init = async () => {
  try {
    await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};
// vv uncomment if you want to see the magic methods in the console on "npm run start:dev"
// console.log("User methods in here:");
// console.log(Object.keys(User.prototype));
// console.log("Book methods in here:");
// console.log(Object.keys(Book.prototype));
// console.log("Review methods in here:");
// console.log(Object.keys(Review.prototype));
init();
