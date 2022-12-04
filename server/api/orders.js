const express = require("express");
const router = require("./users");
const { User, CartItem, Book } = require("../db");

// api/orders/4

// GET api/orders/:orderId
// Returns the array of cartItems under the a given orderId

// GET api//orders
// Returns an an array of a given user's 'orders',
// Which are themselves arrays of isCheckedOut===true cartItems,
// That are bundled by....
//    can't use createdAt, because that's just when they put it in the cart.
// using 'updatedAt' might cause issues.
// We may need another field for 'timeOfPurchase'

// gets back ALL orders of given userId
// GET api/orders/
// router.get("/:userId", async (req, res, next) => {});

router.get("/:username", async (req, res, next) => {
  username = req.params.username;
});

// gets a single order by an orderId
// GET
router.get("/username /:orderId", async (req, res, next) => {
  //
});
