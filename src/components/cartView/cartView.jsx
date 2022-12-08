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


  // make copy
  let filteredCart = [...cart];
  
  // Remove duplicates from the cart for display
  function removeDuplicateObjects(arr) {
    // Create an empty array to store unique objects
    const uniqueObjects = [];
  
    // Loop through the array and add each unique object to the array
    for (let i = 0; i < arr.length; i++) {
      const object = arr[i];
  
      // Check if the object with the same book.id is already in the array
      let isDuplicate = false;
      for (let j = 0; j < uniqueObjects.length; j++) {
        if (uniqueObjects[j].book.id === object.book.id) {
          isDuplicate = true;
        }
      }
  
      if (!isDuplicate) {
        uniqueObjects.push(object);
      }
    }
  
    return uniqueObjects;
  }

  // call removeDupes before render
  filteredCart = removeDuplicateObjects(filteredCart);

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
                className="cartQuantity"
                >
                  <li key={cartItem.id}>{cartItem.book.title}</li>
                  <div>
                  <button>
                  -
                  </button>
                  {quantityCounter[cartItem.book.id]}
                  <button>
                  +
                  </button>
                  Price: {priceCounter[cartItem.book.id]} 
                  </div>
                </div>
              
              )

            })}
          </ul>
          Total Price: $100
        </div>
      </div>
    );
};

export default CartView;
