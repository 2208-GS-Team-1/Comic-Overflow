const express = require("express");
const router = express.Router();
const { User, CartItem } = require("../db");

// GET - api/users --> Gets all users from the db
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleUser = await User.findByPk(id);
    res.send(singleUser);
  } catch (err) {
    console.log(err);
  }
});

// GET api/users/:userId/orders
// Returns all of a given user's orders
// todo

// MOVED TO CART API
// // GET api/users/:userId/cart
// // Returns a given user's active cart (array of cart items)
// router.get("/:userId/cart", async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const activeCart = await CartItem.findAll({
//       include: [Book, User],
//       where: {
//         userId: userId,
//         isCheckedOut: false,
//       },
//     });

//     // If user does not have an active cart
//     if (!activeCart) {
//       res.sendStatus(404);
//     } else {
//       res.send(activeCart);
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });

module.exports = router;
