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
    return {...accumulator, [cartItem.book.title]: (accumulator[cartItem.book.title] || 0) + cartItem.book.price};
  }, {});

  const quantityCounter = cart.reduce((accumulator, cartItem) => {
    return {...accumulator, [cartItem.book.title]: (accumulator[cartItem.book.title] || 0) + 1};
  }, {});


  // make copy
  let filteredCart = [...cart];
  // Remove duplicates from the cart for display
  const removeDuplicates = () => {
    //filteredCart = filteredCart.filter((cartItem, index) => filteredCart.indexOf(cartItem) === index)
    const uniques = [];
    const cache = {};
    // FOr every book we see....

    
    
    for (let i = 0; i < filteredCart.length; i++) {
      // For every book after the one we're looking at...
      for (let k = i; k < filteredCart.length; k++) {
        // If they have the same name, show them
        if (filteredCart[i].book === filteredCart[k].book) {
          uniques.push(filteredCart[i])
        }
      
      }
      // if(!unique.includes())
    }
    filteredCart = uniques;
    console.log(filteredCart)
    
  }

  // call removeDupes before render
  removeDuplicates();

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
                >
                  <li key={cartItem.id}>{cartItem.book.title}</li>
                  <div>
                  <button>
                  -
                  </button>
                  {quantityCounter[cartItem.book.title]}
                  <button>
                  +
                  </button>

                  Price: {priceCounter[cartItem.book.title]} 
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
