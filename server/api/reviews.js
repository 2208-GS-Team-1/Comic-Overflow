const express = require("express");
const router = express.Router();
const { Review, User } = require("../db");

// GET - api/reviews/:bookId --> Gets all reviews for a specific book from the db
router.get("/:bookId", async (req, res, next) => {
  const id = +req.params.bookId;
  try {
    const userReviews = await Review.findAll({
      where: { bookId: id },
      include: [User],
    });
    res.send(userReviews);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
