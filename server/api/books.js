const { Title } = require("@mui/icons-material");
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
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const singleBook = await Book.findByPk(id, {
      include: [Review],
    });
    singleBook ? res.send(singleBook) : res.send("Book not found").status(404);
  } catch (err) {
    next(err);
  }
});

//POST -api/books -> Updates book with given id
router.put("/:id", async ( req, res, next)=>{
  try {

  const {title, author, description, genre, volume, yearOfPublish, isbn, edition, imageURL, price, stock,isDeactivated } = req.body;
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
  res.send("Book was updated").status(201);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
