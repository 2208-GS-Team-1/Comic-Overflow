const express = require("express");
const router = express.Router();
const { User } = require("../db");

// GET - api/users --> Gets all users from the db
router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});
// GET - api/users/:id --> Gets single user from the db
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = regexExp.test(id);
  if (isUUID) {
    try {
      const singleUser = await User.findByPk(id);
      if (singleUser) {
        res.send(singleUser);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.send("ID is not a UUID").status(404);
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

router.put("/:id", async (req, res, next) => {
  try {
    const { address, email, phoneNumber } = req.body;

    const id = req.params.id;
    const updatedUser = await User.findByPk(id);
    await updatedUser.update({
      address,
      email,
      phoneNumber,
    });
    res.send("User was updated").status(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = regexExp.test(id);
  if (isUUID) {
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
  } else {
    res.send("Not a UUID").status(404);
  }
});

module.exports = router;
