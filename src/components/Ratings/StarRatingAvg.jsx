import axios from "axios";
import React, { useEffect, useState } from "react";

const StarRatingAvg = ({ book }) => {
  //use local state
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  //initialize review array variable
  //book gets passed down as prop from AllBooks.jsx
  const handleAllReviews = async () => {
    setLoading(true);
    // GET all reviews for specific book
    const reviews = await axios.get(`api/reviews/${book.id}`);
    //reviews.data = array of reivews for specific book
    setAllReviews(reviews.data);
    console.log(allReviews.length);
    setLoading(false);
  };
  //call function to pass reviews to allReviews
  useEffect(() => {
    handleAllReviews();
  }, []);

  //if length of array > 1 then take average of rating
  if (loading) return <h1>Loading...</h1>;
  return <div>{allReviews.length ? "this has ratings" : "no ratings"}</div>;
};
export default StarRatingAvg;

// const StarRatingAvg = ({ book }) => {
//   //initialize review array variable
//   let allReviews = [];
//   //book gets passed down as prop from AllBooks.jsx
//   const getAllRatings = async () => {
//     // GET all reviews for specific book
//     const reviews = await axios.get(`api/reviews/${book.id}`);
//     //reviews.data = array of reivews for specific book
//     allReviews = reviews.data;
//     console.log(allReviews.length);
//     return;
//   };
//   //call function to pass reviews to allReviews
//   getAllRatings();

//   //if length of array > 1 then take average of rating
//   return <div>{allReviews.length ? "this has ratings" : "no ratings"}</div>;
// };
