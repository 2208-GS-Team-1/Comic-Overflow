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

router.get("/email/:email", async (req, res, next) => {
  const usersEmail = req.params.email;
  try {
    const user = await User.findOne({
      where: {
        email: usersEmail,
      },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
// GET - api/users/:id --> Gets single user from the db
router.get("/:id", async (req, res, next) => {
  console.log("TEST")
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
    res.status(404).send("ID is not a UUID");
  }
});

// POST - api/users --> Adds user to db
router.post("/", async (req, res, next) => {
  try {
    const userWithSameUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const userWithSameEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userWithSameUsername) {
      res.status(400).send("An account with that username already exists");
    } else if (userWithSameEmail) {
      res.status(400).send("An account with that e-mail already exists");
    } else {
      await User.create(req.body);
      res.status(201).send("User has been successfully created");
    }
  } catch (err) {
    next(err);
  }
});

// PUT - /api/users/:id --> Updates user with given id
router.put("/:id", async (req, res, next) => {
  try {
    const { address, email, phoneNumber, firstName, lastName, birthday } = req.body;
    const id = req.params.id;

    // email field must be unique, dont allow this updated email to be one we already have.
    const userWithSameEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    // If the user with this email is NOT this user (identified by id)
    // 400 it.
    if (userWithSameEmail && userWithSameEmail.id !== id)
      return res.status(400).send("An account with that e-mail already exists");

    const updatedUser = await User.findByPk(id);
    await updatedUser.update({
      address,
      email,
      phoneNumber,
      firstName,
      lastName,
      birthday,
    });
    res.status(201).send("User was updated");
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
        ? res.status(400).send("User does not exist")
        : await userToDelete.destroy(),
        res.status(200).send("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send("Not a UUID");
  }
});

module.exports = router;
