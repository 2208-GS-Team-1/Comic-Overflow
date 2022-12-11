/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //book gets passed down as prop from AllBooks.jsx
  //use local state
  const [avgReview, setAvgReview] = useState(0.0);
  const [reviewCount, setReviewCount] = useState(0);

  const handleAvgReview = () => {
    // reviews are associated to book prop
    const reviews = book.reviews;
    //reviews = array of reviews for specific book
    if (reviews.length > 0) {
      //use reduce method to take the average of the rating columns if the array.lenth is > 0
      const totalReviews = reviews.reduce(
        (total, next) => total + next.rating,
        0
      );
      const averageReview = totalReviews / reviews.length;
      setAvgReview(averageReview);
      setReviewCount(reviews.length);
    }
  };

  //useEffect to render the stars using the above function
  useEffect(() => {
    handleAvgReview();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* if length of array > 0 then show the average rating, otherwise show no ratings */}
      <span style={{ maxHeight: "inherit" }}>
        {avgReview > 0 ? (
          <Rating name="read-only" value={avgReview} precision={0.5} readOnly />
        ) : (
          "No ratings yet!"
        )}
      </span>
      {reviewCount > 0 && (
        <span style={{ display: "inline-block" }}>({reviewCount})</span>
      )}
    </div>
  );
};
export default StarRatingAvg;
