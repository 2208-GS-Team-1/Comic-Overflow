import { Card } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import MuiLoader from "../MuiLoader";

const CompletedOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [newOrder, setNewOrder] = useState([]);
  //grab the param after ? in url
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
    //updates back-end
    const fetchOrder = await axios.get(`/api/cart/user/${user.id}/checkOut`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const orderId = fetchOrder.data.id;
    //grab order again because this api call has all the associations
    const fetchOrderAssociations = await axios.get(`/api/orders/${orderId}`);
    console.log(fetchOrderAssociations);
    //store new order in local state
    setNewOrder(fetchOrderAssociations.data);
  };

  useEffect(() => {
    //if no user id, do not run functions
    if (!user.id) return;
    if (!window.localStorage.cart.length) return;
    //returns boolean true if data after ? = success
    if (url.get("success")) {
      //update database with new order
      updateBackend();
      dispatch(setCart([]));
      saveCartToLocalStorage([]);
    }
  }, [user]);

  if (!user.id)
    return (
      <div className="productsContainer">
        <MuiLoader />
      </div>
    );
  return (
    <div>
      <h2>Thank you for your patronage!</h2>
      <h4>Here's your order summary:</h4>
      <Card>
        Order Number: {newOrder.id}
        Order Status: {newOrder.orderStatus}
        {/* Date Ordered: {newOrder.timeOfCheckout.split("T")[0]} */}
      </Card>
    </div>
  );
};
export default CompletedOrder;
