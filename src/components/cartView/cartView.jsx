/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import "./cartViewStyles.css";
const CartView = () => {
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

  useEffect(() => {
    getUsersCart();
  }, [user]);
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
            {cart.map((cartItem) => {
              return <li key={cartItem.id}>{cartItem.book.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
};

export default CartView;
