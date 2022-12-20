import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedBook } from "../../store/bookSlice";
import SingleProductAdd from "../addToCart/SingleProductAdd";
import ReviewsSingleBook from "../Reviews/ReviewsSingleBook";
import StarRatingAvg from "../Reviews/StarRatingAvg";
import "./singleProduct.css";
import MuiLoader from "../MuiLoader";
import { Card } from "@mui/material";
import ReactPaginate from "react-paginate";

const SingleProduct = () => {
  // when item is clicked from all product page, it's automatically directed to this page.
  // this components will take in the id of the item and display appropriate information.

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedBook = useSelector((state) => state.book.selectedBook);
  const [loading, setLoading] = useState(false);
  const [quantityChange, setQuantityChange] = useState(1);
  const { id } = useParams();

  //fetching product's information using ID

  const singleBookHandler = async () => {
    try {
      const bookData = await axios.get(`/api/books/${id}`);
      dispatch(setSelectedBook(bookData.data));
      setLoading(true);
    } catch (err) {
      // If axios fetch fails (eg, a user's url is /books/snfjgkdfn)
      navigate("/404");
    }
  };

  const handleQuantityChange = (event) => {
    const quantityToAdd = Number(event.target.value);
    setQuantityChange(quantityToAdd);
  };

  useEffect(() => {
    singleBookHandler();
  }, []);

  if (!loading) {
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  }

  const bookPrice = (selectedBook.price / 100).toFixed(2);
  return (
    <div className="singleProductPage">
      <Card className="cardForAllProducts" sx={{ boxShadow: 2 }}>
        <div className="singleProduct_container">
          <div className="productimage_left">
            <Card sx={{ boxShadow: 5 }}>
              <img
                className="singleProductImg"
                src={selectedBook.imageURL}
                width="200px"
                height="auto"
              />
            </Card>
          </div>
          <div className="productDescrib_right">
            <h1 className="selectedTitle">{selectedBook.title}</h1>

            {selectedBook.edition ? (
              <h3>
                Volume {selectedBook.volume} - {selectedBook.edition} Edition
              </h3>
            ) : (
              <h3>Volume {selectedBook.volume} </h3>
            )}

            {selectedBook.isbn && (
              <div className="isbn">ISBN: {selectedBook.isbn}</div>
            )}
            {/*if the book is out of stock, displayed price & stock status will change */}
            {selectedBook.stock !== 0 ? (
              <>
                <div className="price">${bookPrice}</div>
                <p className="inStock">In Stock</p>
              </>
            ) : (
              <>
                <div className="price">$0.00</div>
                <p className="inStock">Out of Stock</p>
              </>
            )}

            <div className="quantity">
              <form className="singleProductForm">
                <input
                  className="singleProductInput"
                  name="quantity"
                  min="1"
                  max={selectedBook.stock}
                  type="number"
                  placeholder="1"
                  value={quantityChange.toString()}
                  onChange={handleQuantityChange}
                  // value={quantityToAdd}
                />
                {/*Cart button will be disabled when out of stock */}
                {selectedBook.stock !== 0 ? (
                  <div className="productCardButtons">
                    <SingleProductAdd
                      book={selectedBook}
                      quantity={quantityChange}
                    />
                  </div>
                ) : (
                  <>Out of Stock</>
                )}
              </form>
            </div>
            <div>
              <StarRatingAvg key={selectedBook.id} book={selectedBook} />
            </div>
            <div className="descrb_box">
              <h2>Description</h2>
              <div className="author">Written by {selectedBook.author}</div>
              <div className="product_text">{selectedBook.description}</div>
            </div>
          </div>
        </div>
      </Card>
      <div className="singleBookReivews">
        <h1>Reviews</h1>
        <ReviewsSingleBook key={selectedBook.id} book={selectedBook} />
      </div>
    </div>
  );
};

export default SingleProduct;
