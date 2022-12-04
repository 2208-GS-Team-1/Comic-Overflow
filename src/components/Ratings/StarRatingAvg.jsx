import axios from "axios";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //book gets passed down as prop from AllBooks.jsx
  //use local state
  const [allReviews, setAllReviews] = useState([]);
  //const [avgReview, setAvgReview] = useState(0);
  const [loading, setLoading] = useState(false);
  //initialize average review variable
  let avgReview;
  const handleAllReviews = async () => {
    setLoading(true);
    // GET all reviews for specific book
    const reviews = await axios.get(`api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    setAllReviews(reviews.data);

    setLoading(false);
    console.log("REVIEWS" + allReviews);
  };

  //call function to pass reviews to allReviews
  useEffect(() => {
    handleAllReviews();
    // handleAvgReviews();
  }, []);
  //if length of array > 1 then take average of rating
  if (loading) return <h1>Loading...</h1>;
  return <div>{allReviews.length ? "this has ratings" : "no ratings"}</div>;
};
export default StarRatingAvg;

//   const handleAvgReviews = () => {
//     setLoading(true);
//     if (allReviews.length > 0) {
//       setAvgReview(
//         allReviews.reduce((total, next) => total + next.rating, 0) /
//           allReviews.length
//       );
//     }
//     setLoading(false);
//   };
