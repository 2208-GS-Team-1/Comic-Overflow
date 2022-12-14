/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reviewsSingleBook.css";

const ReviewsSingleBook = ({ book }) => {
  const navigate = useNavigate;

  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAllReviews = async () => {
    try {
      setLoading(true);
      // GET all reviews for specific book. Need to make api call because User is not associated to Book
      const reviews = await axios.get(`/api/reviews/${book.id}`);
      //reviews.data = array of reviews for specific book

      setAllReviews(reviews.data);
      setLoading(false);
    } catch (err) {
      console.log("caught inside reviews!");
      navigate("/404");
    }
  };

  useEffect(() => {
    handleAllReviews();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="allReviews">
      {allReviews.map(review => {
        let shortName = `${review.user.firstName} ${review.user.lastName[0]}.`;
        return (
          <Card
            style={{ textAlign: "center" }}
            sx={{ boxShadow: 2 }}
            key={review.id}
            className="singleReviewCard"
          >
            <CardHeader
              style={{ marginTop: "15px" }}
              title={shortName}
              subheader={review.createdAt.split("T")[0]}
            ></CardHeader>
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.5}
              readOnly
            />
            <CardContent>
              <Typography variant="body1" style={{ marginBottom: "15px" }}>
                {review.subject}
              </Typography>
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
