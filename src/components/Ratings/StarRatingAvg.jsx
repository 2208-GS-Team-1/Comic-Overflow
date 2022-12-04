import axios from "axios";
import React from "react";

const StarRatingAvg = ({ book }) => {
  //initialize review array variable
  let allReviews = [];
  //book gets passed down as prop from AllBooks.jsx
  const getAllRatings = async () => {
    // GET all reviews for specific book
    const reviews = await axios.get(`api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    allReviews = reviews.data;
    console.log(allReviews.length);
    return;
  };
  //call function to pass reviews to allReviews
  getAllRatings();

  //if length of array > 1 then take average of rating
  return <div>{allReviews.length ? "this has ratings" : "no ratings"}</div>;
};

export default StarRatingAvg;
