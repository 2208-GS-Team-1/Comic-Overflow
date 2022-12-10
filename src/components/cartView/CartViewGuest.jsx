/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import "./cartViewStyles.css";
const CartViewGuest = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getUsersCart = async () => {
    // If user slice is not empty, go fetch the cart
    // (If it is empty, that means not logged in, not handling this situation yet)
    if (user.id) {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      const cart = await axios.get(`/api/cart/user/${user.id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(setCart(cart.data));
      setLoading(false);
    }
  };

  // Plus button handler
  const add = async (cartItem) => {
    // To 'add', just +1 its quantity in the db
    const updatedQuantity = cartItem.quantity + 1;

    await axios.put(`/api/cart/${cartItem.id}`, {
      quantity: updatedQuantity,
    });

    // Refetch the new cart
    const newCart = await axios.get(`/api/cart/user/${user.id}`);
    dispatch(setCart(newCart.data));
  };

  // Minus button handler
  const subtract = async (cartItem) => {
    // If they're deleting their own copy...
    if (cartItem.quantity === 1) {
      // Delete in backend
      await axios.delete(`/api/cart/${cartItem.id}`);
    } else {
      // Else, just subtract one from quantity in backend
      const updatedQuantity = cartItem.quantity - 1;
      await axios.put(`/api/cart/${cartItem.id}`, {
        quantity: updatedQuantity,
      });
    }

    // Refetch the new cart
    const newCart = await axios.get(`/api/cart/user/${user.id}`);
    dispatch(setCart(newCart.data));
  };

  useEffect(() => {
    getUsersCart();
  }, [user]);

  const handleCheckOut = () => {};

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
          {cart.map((cartItem) => {
            return (
              <div key={cartItem.id}>
                {cartItem.book.title}
                Vol.{cartItem.book.volume}
                Edition {cartItem.book.volume}
                <div>
                  <button onClick={() => subtract(cartItem)}>-</button>
                  quantity: {cartItem.quantity}
                  <button onClick={() => add(cartItem)}>+</button>
                  price: {cartItem.book.price * cartItem.quantity}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={handleCheckOut}>Check Out Now</button>
      </div>
    );
};

export default CartView;
