const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, CartItem, Book, Order } = require("../db");

const authenticateUser = (req, res, next) => {
  const header = req.headers.authorization;
  //separate the token from the word "Bearer"
  const token = header && header.split(" ")[1];
  jwt.verify(token, process.env.JWT, async (err, user) => {
    //if no token or invalid token, return 401 error
    if (!token) return res.sendStatus(401);
    //Do stuff with user
    const userInfo = await User.findByPk(user.id);
    if (!userInfo) return res.sendStatus(404);
    //set req.user to userInfo
    req.user = userInfo;
    next();
  });
};

// GET api/cart/
// Returns all cart items
// Probably just for internal use.
router.get("/", async (req, res, next) => {
  try {
    const allCartItems = await CartItem.findAll({
      include: [Book, User],
    });
    res.send(allCartItems);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// GET api/cart/user/:userId
// Returns a users 'cart' - aka,
// All of a given user's cartItems that have not been checked out
router.get("/user/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Error check userId
    const regexExpforUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const userIDIsUUID = regexExpforUUID.test(userId);
    if (!userIDIsUUID)
      return res.status(400).send("User ID does not match UUID format");

    const activeCart = await CartItem.findAll({
      include: [Book, User],
      where: {
        userId: userId,
        isCheckedOut: false,
      },
    });

    console.log("activeCart: ");
    console.log(activeCart);

    // If user does not have an active cart (AKA The findAll has a length of 0)
    if (!activeCart.length) {
      res.status(404).send("User does not have active cart items");
    }
    // Otherwise, send it back
    else {
      res.send(activeCart);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST api/cart/user/:userId
// adds an item to given user's cart. (Needs bookId and userId via POST body)
router.post("/", async (req, res, next) => {
  try {
    console.log("\n Inside general cart post...");

    // Needs userId and bookId from POST body and params
    const { bookId, userId } = req.body;
    console.log(`bookId: ${bookId} and userId: ${userId}`);

    //********************** CHECKING USER *******************************/
    // Make sure user exists
    const regexExpforUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const userIDIsUUID = regexExpforUUID.test(userId);
    if (!userIDIsUUID)
      return res.status(400).send("User ID does not match UUID format");

    const user = await User.findByPk(userId);
    console.log(`user: ${user}`);
    if (!user) return res.status(404).send("User not found");

    //********************** CHECKING BOOK *******************************/
    // Before creating a new cartitem, make sure the book is not sold out.
    const book = await Book.findByPk(bookId);
    console.log(book);
    // Make sure book exists
    if (!book) return res.status(404).send("Book not found");

    // If book is sold out, cannot be added to cart
    if (book.stock < 1) {
      res
        .status(400)
        .send("ERROR: Book is out of stock, unable to add to cart.");
    }

    // If it's not sold out, we can make it a cart item.
    else {
      const createdCartItem = await CartItem.create({
        bookId: bookId,
        userId: userId,
      });
      console.log("Add to cart successful!");
      res.status(201).send(createdCartItem);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE api/cart/:cartItemId
// deletes an item from given user's cart.
router.delete("/:cartItemId", async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const cartItemToDelete = await CartItem.findByPk(cartItemId);

    // If not found, send back a 404
    if (!cartItemToDelete) res.send(404);
    // If found, destroy it.
    else {
      await cartItemToDelete.destroy();
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE api/cart/:cartItemId
// update an item.
router.put("/:cartItemId", async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const body = req.body;
    const cartItem = await CartItem.findByPk(cartItemId);

    // If not found, send back a 404
    if (!cartItem) res.send(404);
    // If found, destroy it.
    else {
      await cartItem.update(body);
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

/*
step 1:
/api/cart/newOrder

const newOrder = Order.create({
  userId: cartItem.user.id
});


/api/cart/checkout/:cartItemId
for Each...
  isCheckedOut: true,
  priceTimesQuantityAtCheckOut: cartItem.quantity * cartItem.book price;
  orderId: newOrder.id;
*/

//******************************* NOT TESTED!!!!!! *******************************/
// GET api/cart/user/:userId/checkOut
// Checks out a given user's active cart
router.get("/user/:userId/checkOut", async (req, res, next) => {
  try {
    // get the user id
    const { userId } = req.params;

    // get user's 'active cart' -
    // this is an array of all the things we will 'checkout'
    const usersActiveCart = await CartItem.findAll({
      where: {
        // isCheckedOut: false,
        orderId: null,
        userId: userId,
      },
      include: [Book],
    });

    // Create a new order in the Orders table
    const createdOrder = await Order.create({
      orderStatus: "pending",
      timeOfCheckOut: new Date(),
      userId: userId,
    });

    // Associate the cartitems and the created order
    // This puts orderId on all of the cartitems in usersActiveCart
    await createdOrder.addCartItems(usersActiveCart);
    //await usersActiveCart.setOrder(createdOrder.id);

    // Change values on cartItem
    // need to handle priceAtCheckOut
    usersActiveCart.map(async cartItem => {
      // Calculate what to update the cart item with
      const priceTimesQuantityAtCheckOut =
        cartItem.book.price * cartItem.quantity;

      // give it to the cart item
      await cartItem.update({
        priceTimesQuantityAtCheckOut: priceTimesQuantityAtCheckOut,
      });
    });

    // THE BOOK'S STOCK MUST BE SUFFICIENT FOR  ACTIVE CART'S QUANTITY
    // This is give 500 server error if not!!
    // We need to update our book stock
    usersActiveCart.map(async cartItem => {
      const updatedStockAmount = cartItem.book.stock - cartItem.quantity;

      // Give the updated stock amount TO the book in the books model
      const foundBook = await Book.findByPk(cartItem.book.id);
      await foundBook.update({ stock: updatedStockAmount });
    });

    res.send(createdOrder).status(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
