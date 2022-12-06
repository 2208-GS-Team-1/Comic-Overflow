import {
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./reviewsSingleBook.css";
// import { useSelector } from "react-redux";

const ReviewsSingleBook = ({ book }) => {
  //selectedBook is already in redux from clicking on book
  // const selectedBook = useSelector((state) => state.book.selectedBook);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAllReviews = async () => {
    setLoading(true);
    // GET all reviews for specific book
    console.log(book.id);
    const reviews = await axios.get(`/api/reviews/${book.id}`);
    //reviews.data = array of reviews for specific book

    setAllReviews([...reviews.data]);
    setLoading(false);
  };

  console.log(allReviews);
  useEffect(() => {
    handleAllReviews();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="allReviews">
      {allReviews.map((review) => {
        let shortName = `${review.user.firstName} ${review.user.lastName[0]}.`;
        return (
          <Card
            sx={{ boxShadow: 2 }}
            key={review.id}
            className="singleReviewCard">
            <CardHeader title={shortName} subheader={review.subject}>
              <Typography>{review.createdAt.split("T")[0]}</Typography>
            </CardHeader>
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.5}
              readOnly
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {review.content}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewsSingleBook;
