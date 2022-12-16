const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Order, User, CartItem } = require("../db");

const authenticateUser = (req, res, next) => {
  console.log("hit authenticateUser");
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
// may be used by admin
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    // If user is not an admin, reject!
    if (!req.user.isAdmin) return res.sendStatus(401);

    const allOrders = await Order.findAll({ include: [CartItem] });
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderId
// Get a specific order's information, give an orderId
router.get("/:orderId", authenticateUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId, {
      include: [User, CartItem],
    });

    // If the user with this token is an admin, let them see this.
    // Or, if the user with this token is the one on this order, let them see it.
    if (req.user.isAdmin || req.user === order.user) return res.send(order);
    else return res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/users/:userId
// Get a specific user's order history, including all cart items
router.get("/users/:userId", authenticateUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const associatedUser = await User.findByPk(userId);

    const orders = await Order.findAll({
      where: { userId: userId },
      include: [CartItem, User],
    });

    // if user has no orders, orders === []
    // if user has one order, orders === [ {, user: {userobj} }]

    // if jwtUser is admin, ok.
    // if jwtUser is the user via the req.params , ok
    if (req.user.isAdmin || req.user === associatedUser)
      return res.send(orders);
    else return res.send(401);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
