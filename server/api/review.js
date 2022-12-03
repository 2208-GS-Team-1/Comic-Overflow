const express = require("express");
const router = express.Router();
const { Review } = require("../db");

// GET - api/review/:id --> Gets all reviews from the db
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const userReviews = await Review.findByPk(id);
    res.send(userReviews);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
