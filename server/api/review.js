const express = require("express");
const router = express.Router();
const { Review } = require("../db");

// GET - api/review/:bookId --> Gets all reviews for a specific book from the db
router.get("/:bookId", async (req, res, next) => {
  const id = +req.params.bookId;
  try {
    const userReviews = await Review.findAll({
      where: { bookId: id },
    });
    res.send(userReviews);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
