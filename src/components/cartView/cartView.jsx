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

  // priceCounter is an object where each key is a book's ID
  // and its value is the 'price' which is the quantity * book.price
  const priceCounter = cart.reduce((accumulator, cartItem) => {
    return {
      ...accumulator,
      [cartItem.book.id]:
        (accumulator[cartItem.book.id] || 0) + cartItem.book.price,
    };
  }, {});

  const quantityCounter = cart.reduce((accumulator, cartItem) => {
    return {
      ...accumulator,
      [cartItem.book.id]: (accumulator[cartItem.book.id] || 0) + 1,
    };
  }, {});

  // make copy
  let cartCopy = [...cart];
  console.log(cartCopy);

  const alterCartCopy = () => {
    return;
  };

  // A cart where 'duplicates' of items (same title, author, volume,)
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
          uniques.push(filteredCart[i]);
        }
      }
      // if(!unique.includes())
    }
    filteredCart = uniques;
    console.log(filteredCart);
  };

  // 'flattens' our cart
  const flatten = () => {
    const seenBookIds = {};
    // 3: { {book}, quantity, quantityTimesPrice }
    const flattenedCart = [];

    for (let i = 0; i < cartCopy.length; i++) {
      const currentCartItem = cartCopy[i];

      // If we've never seen the book this cartItem is of, it's new!
      if (!seenBookIds[currentCartItem.id]) {
        const objToStore = { ...currentCartItem };
        // Start it with a quantity of 1
        objToStore.quantity = 1;
        // Start it's totalPrice with the book's price
        objToStore.quantityTimesPrice = currentCartItem.book.price;
        seenBookIds[currentCartItem.id] = objToStore;
      }
      // If we've seen this before...
      else {
        // +1 the quantity of the one in flattenedCart
      }
    }
  };
  // call removeDupes before render
  // removeDuplicates();

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
          {cartCopy.map(cartItem => {
            return (
              <div key={cartItem.id}>
                <h3>Title: {cartItem.book.title}</h3>
                <h5>Volume: {cartItem.book.volume}</h5>
                <h5>Edition: {cartItem.book.edition}</h5>
                <div>
                  <button>-</button>
                  Quantity: {quantityCounter[cartItem.book.id]}
                  <button>+</button>
                  Price: {priceCounter[cartItem.book.id]}
                </div>
              </div>
            );
          })}
          Total Price: $100
        </div>
      </div>
    );
};

export default CartView;
