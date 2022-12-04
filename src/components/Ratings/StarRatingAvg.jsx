import axios from "axios";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //book gets passed down as prop from AllBooks.jsx
  //use local state
  const [avgReview, setAvgReview] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAvgReview = async () => {
    setLoading(true);
    // GET all reviews for specific book
    const reviews = await axios.get(`api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    if (reviews.data.length > 0)
      setAvgReview(
        reviews.data.reduce((total, next) => total + next.rating, 0) /
          reviews.data.length
      );

    setLoading(false);
  };

  //call function to pass reviews to allReviews
  useEffect(() => {
    handleAvgReview();
  }, []);
  console.log("AVG REVIEWS" + avgReview);
  //if length of array > 1 then take average of rating
  if (loading) return <h1>Loading...</h1>;
  return <div>{avgReview > 0 ? avgReview : "no ratings"}</div>;
};
export default StarRatingAvg;
