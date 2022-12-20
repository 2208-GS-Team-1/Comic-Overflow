const app = require("./app");

const init = async () => {
  try {
    const port = process.env.DATABASE_URL || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log("are we here?");
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
// console.log(Object.keys(Order.prototype));
// console.log(Object.keys(CartItem.prototype));
init();
