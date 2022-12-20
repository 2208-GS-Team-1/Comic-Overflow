const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Order, User, CartItem } = require("../db");

// Authenticator that sets req.user to whoever is logged in with this JWT
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

// GET /api/orders
// Gets a list of all orders.
// ONLY ADMINS are allowed to see this!
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    // If user is not an admin, kick them out!
    if (!req.user.isAdmin) return res.sendStatus(401);

    const allOrders = await Order.findAll({ include: [CartItem] });
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderId
// Get a specific order's information, given an orderId
// Accessible to admins, and the user who is attached to the order.
router.get("/:orderId", authenticateUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId, {
      include: [User, CartItem],
    });

    // If the user with this token is an admin, let them see this.
    // Or, if the user with this token is the one on this order, let them see it.
    if (req.user.isAdmin || req.user.id === order.user.id)
      return res.send(order);
    else return res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/users/:userId
// Get a specific user's order history, including all cart items
// Accessible to admins, and the user IF they are the one in the URL.
router.get("/users/:userId", authenticateUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [CartItem, User],
    });

    // if logged-in user is admin, OK! send it back.
    // if logged-in user's id is the one via the req.params, ok! send it back.
    if (req.user.isAdmin || req.user.id === userId) return res.send(orders);
    else return res.sendStatus(401);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
