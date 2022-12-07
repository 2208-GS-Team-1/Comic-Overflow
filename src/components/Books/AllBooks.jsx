import { Button, Card, CardActions, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { sizing } from "@mui/system";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/bookSlice";
import { AddShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./books.css";

import StarRatingAvg from "../Reviews/StarRatingAvg";
import AllProductsAdd from "../addToCart/AllProductsAdd"


const AllBooks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const books = useSelector((state) => state.book.books);
  // state to determine what the user wants to sort by
  const [selectedSort, setSelectedSort] = useState('unsorted')
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


  //Function to handle selected sort change
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value)
  }
  // 'sortedBooks' is the sorted array that we loop over to allow the user to sort by what they want
  let sortedBooks = [...books]
  // switch case that sorts the array based on the selected sort
  const sortBooks = () => {
    switch(selectedSort){
      case 'ascending':
        sortedBooks.sort((a,b)=>(a.price > b.price) ? 1 : -1)
      break
      case "descending":
        sortedBooks.sort((a,b)=>(a.price < b.price) ? 1 : -1)
      break
      case "unsorted":
        sortedBooks = [...books]
      break
    }
  }
  sortBooks()
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="productsContainer">
      <h1>All Comics</h1>
      <div
      className="sortAndFilter"
      >
        <Select
        value={selectedSort}
        onChange={handleSortChange}
        placeholder="sort"
        >
        <MenuItem value="unsorted">
          Unsorted
        </MenuItem>
        <MenuItem value="ascending">
          Price: low to high
        </MenuItem>
        <MenuItem value="descending">
          Price: high to low
        </MenuItem>
        </Select>
        <TextField id="standard-basic" label="Search" variant="standard" />
      </div>
    <div className="allBooks">
      {sortedBooks.map((book) => {
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
