import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ReactPaginate from "react-paginate";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/bookSlice";
import MuiLoader from "../MuiLoader";
import { Link } from "react-router-dom";
import "./books.css";
import StarRatingAvg from "../Reviews/StarRatingAvg";
import AllProductsAdd from "../addToCart/AllProductsAdd";

const AllBooks = () => {
  // useRef allows us to make a reference to a DOM node
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const books = useSelector(state => state.book.books);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSort, setSelectedSort] = useState("newest");
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/books/all/active");
      dispatch(setBooks(data));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  // If loading, display a mui loader
  if (loading)
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  // Handle the react sort state chaning
  const handleSortChange = event => {
    setSelectedSort(event.target.value);
  };
  // handle the react page # state
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
    // so when we scroll to the current wrapper ref, right now we scroll to the top of the page`
    wrapperRef.current.scrollIntoView();
  }
  // 'sortedBooks' is the sorted array that we loop over to allow the user to sort by what they want
  let sortedBooks = [...books];
  // switch case that sorts the array based on the selected sort
  const sortBooks = () => {
    switch (selectedSort) {
      case "ascending":
        sortedBooks.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case "descending":
        sortedBooks.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
      case "unsorted":
        sortedBooks = [...books];
        break;
      case "newest":
        sortedBooks.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        });
        break;
      case "a-z":
        sortedBooks.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        break;
      case "z-a":
        sortedBooks.sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        });
        break;
    }
  };
  sortBooks();
  // PAGINATION
  // Hardcoded # of books per page, if in the future we wanted the user to be able to change the # of items per page
  // we would then could have state determine this.
  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const currentPageData = sortedBooks.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(sortedBooks.length / PER_PAGE);
  //
  return (
    <div className="productsContainer">
      {/* VV this is the node we're referencing */}
      <div ref={wrapperRef}></div>
      <h1>All Comics</h1>
      <div className="sortBar">
        <FormControl
          variant="filled"
          sx={{
            backgroundColor: "white",
            color: "black",
            m: 1,
            minWidth: 120,
            border: "1px solid rgba(0,0,0, .2)",
          }}
          size="small"
        >
          <InputLabel sx={{ color: "black" }}>Sort</InputLabel>
          <Select onChange={handleSortChange} label="Sort" value={selectedSort}>
            <MenuItem value="newest">Newest Arrivals</MenuItem>
            <MenuItem value="ascending">Price, low to high</MenuItem>
            <MenuItem value="descending">Price, high to low</MenuItem>
            <MenuItem value="a-z">Title, A-Z</MenuItem>
            <MenuItem value="z-a">Title, Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Card className="cardForAllProducts" sx={{ boxShadow: 9 }}>
        <div className="allBooks">
          {currentPageData.map(book => {
            return (
              <Card
                sx={{ boxShadow: 2 }}
                className="productCard"
                variant="outlined"
                key={book.id}
              >
                <div className="productCardImg">
                  <Link to={`/books/${book.id}`}>
                    <img src={book.imageURL} />
                  </Link>
                </div>
                <div className="cardRatings">
                  <StarRatingAvg key={book.id} book={book} />
                </div>
                <div className="productCardButtons">
                  <Typography>${(book.price / 100).toFixed(2)}</Typography>
                  <AllProductsAdd book={book} />
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
      <div className="paginateContainer">
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
      </div>
    </div>
  );
};

export default AllBooks;
