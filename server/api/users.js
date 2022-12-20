const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../db");

// Authenticator that sets req.user to whoever is logged in with this JWT
const authenticateUser = (req, res, next) => {
  console.log("inside /api/cart authenticateUser");
  const header = req.headers.authorization;
  console.log(header);
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

// GET - api/users
// Returns all users from the db
// ONLY ADMINS are allowed to see this!
router.get("/", authenticateUser, async (req, res, next) => {
  try {
    // If user is not an admin, kick them out!
    if (!req.user.isAdmin) return res.sendStatus(404);

    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
});

//********* Commented out this route because it is not being used. If you need to use it, you need to use authenticateUser
// GET - api/users/email/:email
// Returns the user with a specified email
// ONLY ADMINS are allowed to see this!
// router.get("/email/:email", async (req, res, next) => {
//   const usersEmail = req.params.email;
//   try {
//     const user = await User.findOne({
//       where: {
//         email: usersEmail,
//       },
//     });
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// GET - api/users/:id --> Gets single user from the db
// Only admins and the logged in user with this ID can see this
router.get("/:id", authenticateUser, async (req, res, next) => {
  const { id } = req.params;

  // If they are not an admin, or they are not logged in as the user with ID, kick them out.

  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const isUUID = regexExp.test(id);
  if (isUUID) {
    try {
      // First check if they are authorized to query/see this info -
      if (req.user.isAdmin || req.user.id === id) {
        const foundUser = await User.findByPk(id);
        // Now check if we send back a 404 or not
        if (foundUser) return res.send(foundUser);
        else res.sendStatus(404);
      }
      // If they not authorized, send back 401.
      else return res.sendStatus(401);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send("ID is not a UUID");
  }
});

// POST - /api/users --> Adds user to db
// Anyone can make a new user!
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
      const createdUser = await User.create(req.body);
      res.status(201).send(createdUser);
    }
  } catch (err) {
    next(err);
  }
});

// PUT - /api/users/:id --> Updates user with given id
router.put("/:id", authenticateUser, async (req, res, next) => {
  try {
    const {
      address,
      email,
      phoneNumber,
      firstName,
      lastName,
      birthday,
      isDeactivated,
    } = req.body;
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
      isDeactivated,
    });
    res.status(201).send("User was updated");
  } catch (err) {
    next(err);
  }
});

// This route is currently not used - because deleting a user would cause issues such as:
// Orphaned cart items, orphaned orders... etc.
// We instead have a 'isDeactivated' field on a user.
router.delete("/:id", authenticateUser, async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(401); // Kick if not admin

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
