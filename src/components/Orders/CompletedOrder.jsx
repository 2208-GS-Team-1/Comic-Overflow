import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";

const CompletedOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  //grab the params after ? in url
  const url = new URLSearchParams(window.location.search);
  const saveCartToLocalStorage = (cart) => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);

    // Now we can save the stringified cart to local storage
    localStorage.setItem("cart", cartString);
  };

  const updateBackend = async () => {
    //token for authentication
    const token = window.localStorage.getItem("token");

    await axios.get(`api/cart/user/${user.id}/checkOut`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };

  useEffect(() => {
    //if no user id, do not run functions
    if (!user.id) return;
    //returns boolean true if data after ? = success
    if (url.get("success")) {
      //update database with new order
      updateBackend();
      dispatch(setCart([]));
      saveCartToLocalStorage([]);
    }
  }, [user]);

  return <div>Item checked out!</div>;
};
export default CompletedOrder;
