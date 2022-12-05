import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedBook } from "../../store/bookSlice";
import "./singleProduct.css";

const SingleProduct = () => {
  // when item is clicked from all product page, it's automatically directed to this page.
  // this components will take in the id of the item and display appropriate information.
  // *** WILL NEED REVIEW COMPONENT TO DISPLAY ALL RELATED REVIEWS ***

  const dispatch = useDispatch();
  const selectedBook = useSelector(state => state.book.selectedBook);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  //fetching product's information using ID

  const singleBookHandler = async () => {
    const bookData = await axios.get(`/api/books/${id}`);
    dispatch(setSelectedBook(bookData.data));
    setLoading(true);
    console.log(bookData.data);
  };

  useEffect(() => {
    singleBookHandler();
  }, []);

  if (loading) {
    if (selectedBook.stock !== 0) {
      const bookPrice = (selectedBook.price / 100).toFixed(2);
      return (
        <div className="singleProductPage">
          <div className="singleProduct_container">
            <div className="productimage_left">
              <img src={selectedBook.imageURL} width="200px" height="auto" />
            </div>
            <div className="productDescrib_right">
              <h1>{selectedBook.title}</h1>
              <h3>
                Volume {selectedBook.volume} - {selectedBook.edition} Edition
              </h3>
              <div className="isbn">ISBN: {selectedBook.isbn}</div>
              <div className="price">${bookPrice}</div>
              <p className="inStock">In Stock</p>
              <div className="quantity">
                {/* below form will need an on-click function to put product into the cart */}

                <form>
                  <input
                    name="quantity"
                    min="1"
                    max={selectedBook.stock}
                    type="number"
                    placeholder="1"
                  />
                  <button name="cartButton">Add to Cart</button>
                </form>
              </div>
              <div className="descrb_box">
                <h2>Description</h2>
                <div className="author">Written by {selectedBook.author}</div>
                <div className="product_text">{selectedBook.description}</div>
              </div>
            </div>
          </div>

          {/* NEED REVIEW COMPONENT HERE! */}
        </div>
      );
    } else {
      return (
        <div>
          <h1>SORRY! SOLD OUT!</h1>
        </div>
      );
    }
  }
};

export default SingleProduct;
