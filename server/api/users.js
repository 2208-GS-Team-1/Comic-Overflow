const express = require("express");
const router = express.Router();
const { User } = require("../db");

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

module.exports = router;
