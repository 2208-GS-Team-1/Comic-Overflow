import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //book gets passed down as prop from AllBooks.jsx
  //use local state
  const [avgReview, setAvgReview] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleAvgReview = async () => {
    setLoading(true);
    // GET all reviews for specific book
    const reviews = await axios.get(`api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    if (reviews.data.length > 0)
      setAvgReview(
        //use reduce method to take the average of the rating columns if the array.lenth is > 0
        reviews.data.reduce((total, next) => total + next.rating, 0) /
          reviews.data.length
      );

    setLoading(false);
  };

  //useEffect to render the stars using the above function
  useEffect(() => {
    handleAvgReview();
  }, []);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      {/* if length of array > 0 then show the average rating, otherwise show no ratings */}
      {avgReview > 0 ? (
        <Rating name="read-only" value={avgReview} precision={0.5} readOnly />
      ) : (
        "no ratings"
      )}
    </div>
  );
};
export default StarRatingAvg;
