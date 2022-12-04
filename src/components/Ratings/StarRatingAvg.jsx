import axios from "axios";
import React from "react";

const StarRatingAvg = ({ book }) => {
  const getAllRatings = async () => {
    const reviews = await axios.get(`api/reviews/${book.id}`);
    console.log(reviews.data);
  };
  getAllRatings();
  return <div>{book.id}</div>;
};

export default StarRatingAvg;
