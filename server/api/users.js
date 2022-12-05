const express = require("express");
const router = express.Router();
const { User, CartItem } = require("../db");

// GET - api/users --> Gets all users from the db
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});
// GET - api/users/:id --> Gets all users from the db
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleUser = await User.findOne({
      where: {
        id: id,
      },
    });
    res.send(singleUser);
  } catch (err) {
    next(err);
  }
});
// POST - api/users --> Adds user to db
router.post("/", async (req, res, next) => {
  try {
    const usernameExists = await User.findAll({
      where: {
        username: req.body.username,
      },
    });
    const emailExists = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (usernameExists.username) {
      res.send("Username already exists").status(409);
    } else if (emailExists.email) {
      res.send("Email already exists").status(409);
    } else {
      await User.create(req.body);
      res.send("User has been succussfully created").status(201);
    }
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userToDelete = await await User.findOne({
      where: {
        id: id,
      },
    });
    !userToDelete
      ? res.send("User does not exist").status(400)
      : await userToDelete.destroy(),
      res.send("User deleted").status(200);
  } catch (err) {
    next(err);
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
