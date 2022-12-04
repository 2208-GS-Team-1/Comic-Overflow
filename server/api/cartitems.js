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

// GET api/cart/:userId/
// Returns the given user's active cart.
router.

