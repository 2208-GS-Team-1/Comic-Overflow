const express = require("express");
const router = express.Router();
const { Book } = require("../db");

// GET - api/books --> Gets all books from the db
router.get("/", async (req, res, next) => {
  try {
    const allBooks = await Book.findAll();
    res.send(allBooks);
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleBook = await Book.findByPk(id);
    singleBook ? res.send(singleBook) : res.send("Book not found").status(404);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
