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

  // We can use this priceCounter to first, make an array of its values...
  const priceArray = Object.values(priceCounter);
  // Then sum that array to get the cart's total price
  const cartTotalPrice = priceArray.reduce((sum, current) => sum + current, 0);

  const quantityCounter = cart.reduce((accumulator, cartItem) => {
    return {
      ...accumulator,
      [cartItem.book.id]: (accumulator[cartItem.book.id] || 0) + 1,
    };
  }, {});

  // make copy
  let cartCopy = [...cart];

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
  cartCopy = removeDuplicateObjects(cartCopy);

  // 'flattens' our cart
  const flatten = () => {
    const seenBookIds = {};
    // 3: { book: {book}, quantity: 3, quantityTimesPrice: 15 }
    const flattenedCart = [];

    for (let i = 0; i < cartCopy.length; i++) {
      const currentCartItem = cartCopy[i];

      // If we've never seen the book this cartItem is of, it's new!
      if (!seenBookIds[currentCartItem.book.id]) {
        // Start it with a quantity of 1
        // Start it's totalPrice with the book's price
        const objToStore = {
          book: { ...currentCartItem },
          quantity: 1,
          quantityTimesPrice: currentCartItem.book.price,
        };

        seenBookIds[currentCartItem.book.id] = objToStore;
      }
      // If we've seen this before...
      else {
        // +1 the quantity of the one in flattenedCart
        seenBookIds[currentCartItem.book.id].quantity += 1;
        seenBookIds[currentCartItem.book.id].quantityTimesPrice +=
          currentCartItem.book.price;
      }
    }
    console.log("seenBookIds: ");

    console.log(seenBookIds);
  };
  // flatten();

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
          Total Price: {priceArray.reduce((sum, current) => sum + current, 0)}
        </div>
      </div>
    );
};

export default CartView;
