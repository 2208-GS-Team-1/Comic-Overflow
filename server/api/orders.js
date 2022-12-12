const express = require("express");
const router = express.Router();
const { Order, User, CartItem } = require("../db");

/* TODO: 
  Put authenticateUserthis back in routes 
  (Currently it only works for get("/user/:userId") can't figure out why)
*/
// authenticateUser is a middleware used to check the JWT
// Used in all singular-order routes
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
// may be used by admin
router.get("/", async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({ include: [CartItem] });
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderId
// Get a specific order's information, give an orderId
router.get("/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByPk(orderId, {
      include: [User, CartItem],
    });
    !order && res.status(404).send("Order not found");
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/users/:users
// Get a specific user's order history, including all cart items
router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({
      where: { userId: userId },
      include: [CartItem],
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
