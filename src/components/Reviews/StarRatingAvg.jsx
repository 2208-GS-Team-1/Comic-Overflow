/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //book gets passed down as prop from AllBooks.jsx
  //use local state
  const [avgReview, setAvgReview] = useState(0.0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAvgReview = async () => {
    setLoading(true);
    // GET all reviews for specific book
    const reviews = await axios.get(`/api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    if (reviews.data.length > 0) {
      setAvgReview(
        //use reduce method to take the average of the rating columns if the array.lenth is > 0
        reviews.data.reduce((total, next) => total + next.rating, 0) /
          reviews.data.length
      );
      setReviewCount(reviews.data.length);
    }

    setLoading(false);
  };

  //useEffect to render the stars using the above function
  useEffect(() => {
    handleAvgReview();
  }, []);

  if (loading) return <div>Loading...</div>;
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
      {reviewCount > 0 ? (
        <span style={{ display: "inline-block" }}>({reviewCount})</span>
      ) : (
        ""
      )}
    </div>
  );
};
export default StarRatingAvg;
