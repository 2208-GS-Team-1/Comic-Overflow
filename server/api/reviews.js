const express = require("express");
const router = express.Router();
const { Review, User } = require("../db");

// GET - api/reviews/:bookId --> Gets all reviews for a specific book from the db
router.get("/:bookId", async (req, res, next) => {
  try {
    const id = +req.params.bookId;
    if (isNaN(id)) return res.sendStatus(404);

    const userReviews = await Review.findAll({
      where: { bookId: id },
      include: [User],
    });

    if (!userReviews) res.sendStatus(404);
    else {
      res.send(userReviews);
    }
  } catch (err) {
    next(err);
  }
});

// POST - api/reviews/--> Adds review to db
router.post("/", async (req,res,next)=>{
  try {
    const { subject, content, rating, userId, bookId } = req.body;
    const postedReview = await Review.create({
      subject: subject,
      content: content,
      rating: rating,
      userId: userId,
      bookId: bookId,
    });

    res.status(201).send(postedReview)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
