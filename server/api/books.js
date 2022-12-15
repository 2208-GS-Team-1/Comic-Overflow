const express = require("express");
const router = express.Router();
const { Book, Review } = require("../db");

// GET - api/books --> Gets all books from the db
router.get("/", async (req, res, next) => {
  try {
    const allBooks = await Book.findAll({
      include: [Review],
    });
    res.send(allBooks);
  } catch (err) {
    next(err);
  }
});
//GET - /api/books/active
router.get("/active", async (req, res, next) => {
  try {
    const allBooks = await Book.findAll({
      where: {
        isDeactivated: false,
      },
      include: [Review],
    });
    res.send(allBooks);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleBook = await Book.findByPk(id, {
      include: [Review],
    });
    singleBook ? res.send(singleBook) : res.status(404).send("Book not found");
  } catch (err) {
    next(err);
  }
});

//PUT -api/books -> Updates book with given id
router.put("/:id", async (req, res, next) => {
  try {
    const {
      title,
      author,
      description,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      imageURL,
      price,
      stock,
      isDeactivated,
    } = req.body;
    const id = req.params.id;
    const updateBook = await Book.findByPk(id);

    await updateBook.update({
      title,
      author,
      description,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      imageURL,
      price,
      stock,
      isDeactivated,
    });
    res.status(201).send("Book was updated");

  } catch (error) {
    next(error);
  }
});

module.exports = router;
