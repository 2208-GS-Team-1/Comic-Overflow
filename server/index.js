const app = require("./app");
const { seed, User, Cart, Book, Review } = require("./db");

const init = async () => {
  try {
    await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};
console.log("User methods in here:");
console.log(Object.keys(User.prototype));
console.log("Book methods in here:");
console.log(Object.keys(Book.prototype));
console.log("Review methods in here:");
console.log(Object.keys(Review.prototype));
init();
