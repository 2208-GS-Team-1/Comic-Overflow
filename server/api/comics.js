const express = require("express");
const router = express.Router();
const { Book } = require("../db");

// GET - api/comics --> Gets all comics from the db
router.get("/", async (req, res, next) => {
  try {
    const allComics = await Book.findAll();
    res.send(allComics);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
