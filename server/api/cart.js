require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, CartItem, Book, Order } = require("../db");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Authenticator that sets req.user to whoever is logged in with this JWT
const authenticateUser = (req, res, next) => {
  console.log("inside /api/cart authenticateUser");
  const header = req.headers.authorization;
  console.log(header);
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
// Returns all cart items - Probably just for internal use.
// ONLY ADMINS are allowed to see this!
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    // If user is not an admin, kick them out!
    if (!req.user.isAdmin) return res.sendStatus(401);

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
// An admin - or the user who these items belong to - is allowed to see it
router.get("/user/:userId", authenticateUser, async (req, res, next) => {
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
    // If the user with this token is an admin, let them see this.
    // Or, if the user with this token is the one on this userId, let them see it.
    if (req.user.isAdmin || req.user.id === userId) res.send(activeCart);
    else return res.sendStatus(401);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// POST api/cart/user/:userId
// adds an item to given user's cart. (Needs bookId and userId via POST body)
router.post("/", authenticateUser, async (req, res, next) => {
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
// admins and the user who is on this cart item can do this.
router.delete("/:cartItemId", authenticateUser, async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const cartItemToDelete = await CartItem.findByPk(cartItemId, {
      include: [User],
    });

    // if logged-in user is admin, OK! continue logic.
    // if logged-in user's id is the one via the req.params, ok! continue logic.
    if (req.user.isAdmin || req.user.id === cartItemToDelete.user.id) {
      if (!cartItemToDelete) return res.sendStatus(404); // If not found, send back a 404
      await cartItemToDelete.destroy(); // If found, destroy it
      return res.sendStatus(200);
    }
    // If they aren't allowed to delete this, 401 it.
    else return res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

// PUT api/cart/:cartItemId
// update an item.
// admins and the user who is on this cart item can do this.
router.put("/:cartItemId", authenticateUser, async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const body = req.body;
    const cartItem = await CartItem.findByPk(cartItemId, {
      include: [User],
    });

    console.log(cartItem.user.id);
    // if logged-in user is admin, OK! continue logic.
    // if logged-in user's id is the one via the req.params, ok! continue logic.
    if (req.user.isAdmin || req.user.id === cartItem.user.id) {
      if (!cartItem)
        return res.sendStatus(404); // If not found, send back a 404
      else {
        await cartItem.update(body); // If found, update it.
        res.sendStatus(200);
      }
    }
    // If they aren't allowed to update this, 401 it.
    else return res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

// GET /api/cart/user/:userId/checkOut
// Checks out a given user's active cart
// ONLY a user with this userID can do this. admins not included.
router.get(
  "/user/:userId/checkOut",
  authenticateUser,
  async (req, res, next) => {
    try {
      // ************************** AUTHENTICATION**************************** //
      const { userId } = req.params; // Get the user id
      if (req.user.id !== userId) return res.sendStatus(401); // If they aren't this user, unauthorized

      // ************************** GETTING USER'S ACTIVE CART **************************** //

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

// POST /api/cart/quantity - creates a cartitem with a given given quantity number
// Only the user who is logged in for the POST'S body's userId can do this.
router.post("/quantity", authenticateUser, async (req, res, next) => {
  try {
    // Needs userId and bookId from POST body and params
    const { bookId, userId, quantityToAdd } = req.body;

    if (userId !== req.user.id) return res.sendStatus(401); // Kick them if they're not logged in as this userId
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

//************//****************//******************** TODO!!!!!!! //****************//*****************/
// POST /api/cart/stripeCheckout
// Used for stripe API payment
router.post("/stripeCheckout", authenticateUser, async (req, res, next) => {
  try {
    //grab order details from req.body
    const cart = req.body;

    // TO DO!!!!!!
    //if ( !== req.user.id) return res.sendStatus(401); // Kick them if they're not logged in as this userId

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
