require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, CartItem, Book, Order } = require("../db");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/* TODO: 
  Put authenticateUserthis back in routes 
  (Currently it only works for get("/user/:userId") can't figure out why)
*/
// authenticateUser is a middleware used to check the JWT
// Used in all singular-cart routes
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

/* Should we end up deleting this route?
 We want only admins to have access to it - not just any logged in user.
Not sure how to do that. */
// GET api/cart/
// Returns all cart items - Probably just for internal use.
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
// Returns a users 'active cart' - aka,
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
        orderId: null,
      },
    });

    // If user does not have an active cart (AKA The findAll has a length of 0)

    res.send(activeCart);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST api/cart/user/:userId
// adds an item to given user's cart. (Needs bookId and userId via POST body)
router.post("/", async (req, res, next) => {
  try {
    // Needs userId and bookId from POST body and params
    const { bookId, userId } = req.body;

    //********************** CHECKING USER *******************************/

    // Check that userId is a valid UUID format BEFORE we use it for query (can cause error)
    const regexExpforUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const userIDIsUUID = regexExpforUUID.test(userId);
    if (!userIDIsUUID)
      return res.status(400).send("User ID does not match UUID format");

    // Make sure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");

    //********************** CHECKING BOOK *******************************/
    // Before creating a new cartitem, make sure the book is not sold out.
    const book = await Book.findByPk(bookId);
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

// PUT api/cart/:cartItemId
// update an item.
router.put("/:cartItemId", async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const body = req.body;
    const cartItem = await CartItem.findByPk(cartItemId);

    // If not found, send back a 404
    if (!cartItem) res.send(404);
    else {
      // If found, update it.
      await cartItem.update(body);
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

// GET api/cart/user/:userId/checkOut
// Checks out a given user's active cart
router.get(
  "/user/:userId/checkOut",

  async (req, res, next) => {
    try {
      // ************************** GETTING USER'S ACTIVE CART **************************** //

      const { userId } = req.params; // Get the user id

      // Check that userId is a valid UUID format BEFORE we use it for query (can cause error)
      const regexExpforUUID =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      const userIDIsUUID = regexExpforUUID.test(userId);
      if (!userIDIsUUID)
        return res.status(400).send("User ID does not match UUID format");

      // Get user's 'active cart' - this is an array of all the cartitems we will 'checkout'
      const usersActiveCart = await CartItem.findAll({
        where: {
          orderId: null,
          userId: userId,
        },
        include: [Book],
      });

      // ************************** CREATING THE ORDER **************************** //

      // We need to know the order's total price before we insert, because it is a required field.
      // Calculate the total price of the cart
      let orderTotalPrice = usersActiveCart.reduce((total, cartItem) => {
        const priceToAdd = cartItem.book.price * cartItem.quantity;
        return total + priceToAdd;
      }, 0);

      // Create a new order in the Orders table
      const createdOrder = await Order.create({
        orderStatus: "pending",
        timeOfCheckOut: new Date(),
        userId: userId,
        price: orderTotalPrice,
      });

      // ************************** UPDATING THE CARTITEMS **************************** //

      // Associate the cartitems and the created order
      // This puts orderId on all of the cartitems in usersActiveCart
      await createdOrder.addCartItems(usersActiveCart);

      // Now that we are checking out,
      // cartItem's priceTimesQuantityAtCheckOut needs to be set.
      // This will be a historically-accurate 'what the user paid for this cartitem x quantity'
      usersActiveCart.map(async (cartItem) => {
        // Calculate what to update the cart item with
        const priceTimesQuantityAtCheckOut =
          cartItem.book.price * cartItem.quantity;

        // Update the cart item to have this insertion of data
        await cartItem.update({
          priceTimesQuantityAtCheckOut: priceTimesQuantityAtCheckOut,
        });
      });

      // ************************** UPDATING THE BOOK'S STOCK **************************** //

      // THE BOOK'S STOCK MUST BE SUFFICIENT FOR  ACTIVE CART'S QUANTITY
      // This is give 500 server error if not!!
      // We need to update our book stock
      usersActiveCart.map(async (cartItem) => {
        // Calculate what the book's stock will now be, now that the order has gone through.
        const updatedStockAmount = cartItem.book.stock - cartItem.quantity;

        // Give the updated stock amount TO the book in the books model
        const foundBook = await Book.findByPk(cartItem.book.id);
        await foundBook.update({ stock: updatedStockAmount });
      });

      // ************************** DONE **************************** //

      res.send(createdOrder).status(200);
    } catch (err) {
      next(err);
    }
  }
);
router.post("/quantity", async (req, res, next) => {
  try {
    // Needs userId and bookId from POST body and params
    const { bookId, userId, quantityToAdd } = req.body;

    //********************** CHECKING USER *******************************/

    // Check that userId is a valid UUID format BEFORE we use it for query (can cause error)
    const regexExpforUUID =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const userIDIsUUID = regexExpforUUID.test(userId);
    if (!userIDIsUUID)
      return res.status(400).send("User ID does not match UUID format");

    // Make sure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");

    //********************** CHECKING BOOK *******************************/
    // Before creating a new cartitem, make sure the book is not sold out.
    const book = await Book.findByPk(bookId);
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
        quantity: quantityToAdd,
      });
      res.status(201).send(createdCartItem);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/stripeCheckout", async (req, res, next) => {
  //grab order details from req.body
  const cart = req.body;
  try {
    //create stripe session
    const session = await stripe.checkout.sessions.create({
      //use preset stripe keys to set payment type, mode, line_items
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map((cartItem) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: cartItem.book.title,
              images: [cartItem.book.image],
            },
            unit_amount: cartItem.book.price,
          },
          quantity: cartItem.quantity,
        };
      }),
      //set url that page goes to after success
      success_url: `${process.env.SERVER_URL}/completedOrder?success=true`,
      //set url that page goes to after failure (required)
      cancel_url: `${process.env.SERVER_URL}/Books`,
    });
    //send Stripe url back to the user
    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
