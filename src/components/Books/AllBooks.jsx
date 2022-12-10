
import { Card,  Typography } from "@mui/material";

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/bookSlice";

import MuiLoader from "../MuiLoader";

import { Link } from "react-router-dom";
import "./books.css";

import StarRatingAvg from "../Reviews/StarRatingAvg";
import AllProductsAdd from "../addToCart/AllProductsAdd"


const AllBooks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const books = useSelector((state) => state.book.books);
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/books");
      dispatch(setBooks(data));
    } catch (err) {
      console.log(err); //<- not sure if we want the err console logged but fine for dev purposes.
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  if (loading) return(
    <div
    className="loadingContainer">
      <MuiLoader/>
    </div>
  )
  return (
    <div className="productsContainer">
      <h1>All Comics</h1>

    <div className="allBooks">
      {books.map((book) => {
        return (
          <Card
            sx={{ boxShadow: 2 }}
            className="productCard"
            variant="outlined"
            key={book.id}>
            <div className="productCardImg">
              <Link to={`/books/${book.id}`}>
                <img src={book.imageURL} />
              </Link>
            </div>
            <div
            className="cardRatings"
            >
              <StarRatingAvg key={book.id} book={book} />
            </div>
            <div className="productCardButtons">
              <Typography>${(book.price / 100).toFixed(2)}</Typography>
              <AllProductsAdd bookId={book.id}/>
            </div>
          </Card>
        );
      })}
    </div>

    </div>
  );
};

export default AllBooks;
