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
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./ReviewsSingleBook.css";
import UserReview from "./UserReview";

const ReviewsSingleBook = ({ book, user }) => {
  const navigate = useNavigate;
  const [currentPage, setCurrentPage] = useState(0);
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
      console.log(err);
      navigate("/404");
    }
  };
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    // so when we scroll to the current wrapper ref, right now we scroll to the top of the page`
  }
  useEffect(() => {
    handleAllReviews();
  }, []);
 // PAGINATION
  // Hardcoded # of books per page, if in the future we wanted the user to be able to change the # of items per page
  // we would then could have state determine this.
  const PER_PAGE = 3;
  const offset = currentPage * PER_PAGE;
  const currentPageData = allReviews.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(allReviews.length / PER_PAGE);
  //
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="allReviews">
      {currentPageData.map(review => {
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
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
        <UserReview handleAllReviews={handleAllReviews} book={book} user={user} />
    </div>
  );
};

export default ReviewsSingleBook;
