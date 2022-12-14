const express = require("express");
const router = express.Router();
const { Review, User } = require("../db");

// GET - api/reviews/:bookId --> Gets all reviews for a specific book from the db
router.get("/:bookId", async (req, res, next) => {
  console.log("Inside api/reviews/:bookId...");
  const id = +req.params.bookId;

  console.log("id: ", id);
  if (isNaN(id)) return res.sendStatus(404);

  try {
    const userReviews = await Review.findAll({
      where: { bookId: id },
      include: [User],
    });

    if (!userReviews) return res.sendStatus(404);
    res.send(userReviews);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
