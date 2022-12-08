import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import "./cartViewStyles.css";
const CartView = () => {
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getUsersCart = async () => {
    // If user slice is not empty, go fetch the cart
    // (If it is empty, that means not logged in, not handling this situation yet)
    if (user.id) {
      setLoading(true);
      const cart = await axios.get(`/api/cart/user/${user.id}`);
      dispatch(setCart(cart.data));
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsersCart();
  }, [user]);

  const priceCounter = cart.reduce((accumulator, cartItem) => {
    return {...accumulator, [cartItem.book.id]: (accumulator[cartItem.book.id] || 0) + cartItem.book.price};
  }, {});

  const quantityCounter = cart.reduce((accumulator, cartItem) => {
    return {...accumulator, [cartItem.book.id]: (accumulator[cartItem.book.id] || 0) + 1};
  }, {});

  const totalPrice = cart.reduce((total, cartItem) => {
    return total + cartItem.book.price;
  }, 0);
  // make copy
  let filteredCart = [...cart];
  
  // Remove duplicates from the cart for display
  function removeDuplicateBooks(arr) {
    // Create an empty array to store unique bookss
    const uniqueBooks = [];
  
    // Loop through the array and add each unique book to the array
    for (let i = 0; i < arr.length; i++) {
      const book = arr[i];
  
      // Check if the book with the same book.id is already in the array
      let isDuplicate = false;
      for (let j = 0; j < uniqueBooks.length; j++) {
        if (uniqueBooks[j].book.id === book.book.id) {
          isDuplicate = true;
        }
      }
  
      if (!isDuplicate) {
        uniqueBooks.push(book);
      }
    }
  
    return uniqueBooks;
  }

  // call removeDupes before render
  filteredCart = removeDuplicateBooks(filteredCart);

  if (loading) {
    return "Loading...";
  } else if (!user.id) {
    // If user is not logged in, we are not going to give them a cart.
    // Todo later!
    return "please make an account";
  } else
    return (
      <div className="cart">
        <div className="usersCart">
          {user.username}'s Cart
          <ul>
            {filteredCart.map(cartItem => {
              return (
                <div
                className="cartTitleAndPrice"
                >
                  <li>Title: {cartItem.book.title}</li>
                  <li>Volume: {cartItem.book.volume}</li>
                  <li>Edition: {cartItem.book.edition}</li>
                  <div>
                  <button>
                  -
                  </button>
                  {quantityCounter[cartItem.book.id]}
                  <button>
                  +
                  </button>
                  Price: ${(priceCounter[cartItem.book.id] / 100).toFixed(2)} 
                  </div>
                </div>
              )
            })}
          </ul>
          Total Price: ${(totalPrice / 100).toFixed(2)}
        </div>
      </div>
    );
};

export default CartView;
