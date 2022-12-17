const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Book, Review, User } = require("../db");

// Authenticator that sets req.user to whoever is logged in with this JWT
const authenticateUser = (req, res, next) => {
  const header = req.headers.authorization;
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

// GET - /api/books --> Gets all books from the db
// No need for authentication - anyone is allowed to see our products!
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

// GET - /api/books/all/active
// Gets book from db that are "active" so that we aren't displaying books that are inactive
// No need for authentication - anyone is allowed to see our products!
router.get("/all/active", async (req, res, next) => {
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

// GET - /api/books/:id
// Gets the data on a specific book
// No need for authentication - anyone is allowed to see our products!
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

// PUT - /api/books/:id
// Updates book with given id
// ONLY ADMINS are allowed to do this!
router.put("/:id", authenticateUser, async (req, res, next) => {
  try {
    // If user is not an admin, kick them out!
    if (!req.user.isAdmin) return res.sendStatus(401);

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

// POST - add new book given body
router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      author,
      description,
      imageURL,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      price,
      stock,
      isDeactivated,
    } = req.body;

    await Book.create({
      title,
      author,
      description,
      imageURL,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      price,
      stock,
      isDeactivated,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
