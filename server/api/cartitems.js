const express = require("express");
const router = require("./users");
const { User, CartItem, Book } = require("../db");

// GET api/cart/:userId
// Returns a users 'cart' - aka,
// All of a given user's cartItems that have not been checked out
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const activeCart = await CartItem.findAll({
      where: {
        userId: userId,
      },
      include: [Book, User],
    });
  } catch (err) {
    console.log(err);
  }
});

// GET api/user/:userId/cart
// Returns the given user's active cart.

// GET api/:userId/orders
// Returns an an array of a given user's 'orders',
// Which are themselves arrays of isCheckedOut===true cartItems,
// That are bundled by....
//    can't use createdAt, because that's just when they put it in the cart.
// using 'updatedAt' might cause issues.
// We may need another field for 'timeOfPurchase'
