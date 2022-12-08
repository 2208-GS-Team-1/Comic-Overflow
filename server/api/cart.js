const express = require("express");
const router = express.Router();
const { User, CartItem, Book } = require("../db");

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

    // console.log("activeCart: ");
    // console.log(activeCart);

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

// GET api/cart/:cartItemId
// gets an cart item based on id
router.get("/:cartItemId", async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await CartItem.findByPk(cartItemId);

    // If not found, send back a 404
    if (!cartItem) res.send(404);
    // If found, destroy it.
    else {
      res.send(cartItem);
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
// Given a user's ID and the book ID
// it will delete whatever cartitem that matches those it finds first.
router.delete("/user/:userId/book/:bookId", async (req, res, next) => {
  try {
    const { userId, bookId } = req.params;
    const cartItemToDelete = await CartItem.findOne({
      where: { userId: userId, bookId: bookId },
      include: [Book, User],
    });

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

// Given a user's ID, checks out EVERYTHING that is in their active cart
router.get("/checkout/user/:userId", async (req, res, next) => {
  try {
    console.log("checking out all items!");
    // Find all of the user's 'active' cart items
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

    console.log("active cart passed");
    const dateToInsert = new Date();

    await activeCart.map(async cartItem => {
      return await cartItem.update({
        isCheckedOut: true,
        timeOfCheckOut: dateToInsert,
        priceAtCheckOut: cartItem.book.price,
        orderStatus: "pending",
      });
    });

    res.sendStatus(200);
    // await CartItem.update(
    //   // New body:
    //   {
    //     isCheckedOut: true,
    //     timeOfCheckOut: dateToInsert,
    //     priceAtCheckOut: cartItem.book.price,
    //     orderStatus: "pending",
    //   },
    //   // Conditions for the initial query:
    //   {
    //     where: {
    //       userId: userId,
    //       isCheckedOut: false,
    //     },
    //   }
    // );
  } catch (err) {
    next(err);
  }
});
//******************************* NOT TESTED!!!!!! *******************************/
// GET api/cart/:cartItemId/checkOut
// Used when the user has purchased this item.
// Updates the fields on the cartItem (but uses GET because no body is needed from the user)

// Deciding it I want the checkout process api req to be per item, or based on a user.
// Probably latter.
router.get("/:cartItemId/checkOut", async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await CartItem.findByPk(cartItemId);

    // If not found, send back a 404
    if (!cartItem) res.send(404);
    // If found, update the fields so that it looks checked out
    else {
      // These are the fields and the values that a checked out item should have
      const updatedFields = {
        isCheckedOut: true,
        timeOfCheckOut: new Date(),
        priceAtCheckOut: cartItem.book.price,
        orderStatus: "pending",
      };
      await cartItem.update(updatedFields);
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
