import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedBook } from "../../store/bookSlice";
import { setCart } from "../../store/cartSlice";
import SingleProductAdd from "../addToCart/SingleProductAdd";
import ReviewsSingleBook from "../Reviews/ReviewsSingleBook";
import StarRatingAvg from "../Reviews/StarRatingAvg";
import "./singleProduct.css";

const SingleProduct = () => {
  // when item is clicked from all product page, it's automatically directed to this page.
  // this components will take in the id of the item and display appropriate information.
  // *** WILL NEED REVIEW COMPONENT TO DISPLAY ALL RELATED REVIEWS ***

  const dispatch = useDispatch();
  const [bookQuantity, setBookQuantity] = useState(1)
  const selectedBook = useSelector((state) => state.book.selectedBook);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useSelector(state => state.user);
  const { cart } = useSelector((state) => state.cart);
  const userId = user.id
  const bookId = selectedBook.id

  // fetching product's information using ID

  const singleBookHandler = async () => {
    setLoading(true)
    const bookData = await axios.get(`/api/books/${id}`);
    dispatch(setSelectedBook(bookData.data));
    setLoading(false)
  };

  useEffect(() => {
    singleBookHandler();
  }, []);
  const handleQuantityChange = (event) => {
    setBookQuantity(event.target.value)
  }
  // const addToCart = async () => {
  //   try {
  //     if (!user.id) {
  //         alert("Please login to add to cart");
  //     } else {
  //       const existingItem = cart.find((cartItem) => cartItem.book.id === bookId);
  //       // If book quantity > 1 and the item already exists in our cart
  //         if(bookQuantity > 1 && existingItem){
  //           // if the items book stock is > the amount we already have + the amount want to add
  //           if(existingItem.book.stock >= (existingItem.quantity + Number(bookQuantity))) {  
  //             await axios.put(`/api/cart/${existingItem.id}`, {
  //                 quantity: existingItem.quantity + Number(bookQuantity),
  //             });
  //             const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //             dispatch(setCart(updatedCart.data))
  //           } else {
  //             // if the user tries to add more to their cart than the stock has, we max their cart to the stock amount
  //             await axios.put(`/api/cart/${existingItem.id}`, {
  //               quantity: existingItem.book.stock,
  //           })
  //           const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //           dispatch(setCart(updatedCart.data))
  //           }
  //         } else if (existingItem && bookQuantity === 1){
  //           if(existingItem && existingItem.book.stock >= (existingItem.quantity + Number(bookQuantity))) {  
  //             await axios.put(`/api/cart/${existingItem.id}`, {
  //                 quantity: existingItem.quantity + Number(bookQuantity),
  //             });
  //             const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //             dispatch(setCart(updatedCart.data))
  //           }
  //         } else if(!existingItem){
  //           const book = await axios.get(`/api/books/${bookId}`)
  //           const bookToAdd = book.data
  //           const numBookQuantity = Number(bookQuantity)
  //           if(numBookQuantity === 1 && bookToAdd.stock > numBookQuantity){
  //             const body = { userId, bookId };
  //             await axios.post("/api/cart", body);
  //             const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //             dispatch(setCart(updatedCart.data))
  //           } else if (numBookQuantity <= bookToAdd.stock){
  //             const body = { userId, bookId };
  //           await axios.post(`/api/cart/${numBookQuantity}`, body);
  //           const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //             dispatch(setCart(updatedCart.data))
  //           } else {
  //             const body = { userId, bookId };
  //             await axios.post(`/api/cart/${bookToAdd.stock}`, body);
  //             const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
  //             dispatch(setCart(updatedCart.data))
  //         }
  //     }
  //   }
  // } catch (error) {
  //     console.log(error)
  // }
  // }
  if (loading) return <div>loading...</div>
    if (selectedBook.stock !== 0) {
      const bookPrice = (selectedBook.price / 100).toFixed(2);
      return (
        <div className="singleProductPage">
          <div className="singleProduct_container">
            <div className="productimage_left">
              <img
                className="singleProductImg"
                src={selectedBook.imageURL}
                width="200px"
                height="auto"
              />
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

              <div className="isbn">ISBN: {selectedBook.isbn}</div>
              <div className="price">${bookPrice}</div>
              <p className="inStock">In Stock</p>
              <div className="quantity">
                {/* below form will need an on-click function to put product into the cart */}

                <form className="singleProductForm">
                  <input
                    className="singleProductInput"
                    name="quantity"
                    min="1"
                    max={selectedBook.stock}
                    type="number"
                    value={bookQuantity}
                    onChange={handleQuantityChange}
                  />
                </form>
                  {/* <button 
                  onClick={addToCart}
                  name="cartButton">Add to Cart</button> */}
                  <SingleProductAdd bookQuantity={bookQuantity}/>
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
          <div>
            <ReviewsSingleBook key={selectedBook.id} book={selectedBook} />
          </div>
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

export default SingleProduct;
