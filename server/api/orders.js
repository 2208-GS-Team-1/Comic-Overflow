const express = require("express");
const router = express.Router();
const { Order, User, CartItem } = require("../db");

// GET /api/orders/:orderId
// Get a specific order's information, give an orderId
router.get("/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByPk(orderId, {
      include: [User, CartItem],
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/order/users/:users
// TODO
router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
});

module.exports = router;
