import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import MuiLoader from "../MuiLoader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserOrdersDetails from "./UserOrdersDetails";

const CompletedOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [newOrder, setNewOrder] = useState([]);
  let orderId;
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
    // JWT & authorization header to give for authorization check in the API
    const token = window.localStorage.getItem("token");
    const config = { headers: { authorization: "Bearer " + token } };
    const getCart = JSON.parse(localStorage.getItem("cart"));
    // if getCart is not empty, we have to perform the back-end functions to update db
    if (getCart.length > 0) {
      //updates back-end
      const fetchOrder = await axios.get(
        `/api/cart/user/${user.id}/checkOut`,
        config
      );
      //gets the order id so we can query the order with all the associations
      orderId = fetchOrder.data.id;
    }
    // if getCart is empty, that means the user reloaded the page.
    // grab the orderId from localStorage instead
    if (getCart.length === 0) {
      orderId = JSON.parse(localStorage.getItem("checkedOutCartId"));
    }

    //grab order again because this api call has all the associations
    const fetchOrderAssociations = await axios.get(`/api/orders/${orderId}`);
    //set localStorage cart number
    localStorage.setItem("checkedOutCartId", orderId);
    //store new order in local state
    setNewOrder(fetchOrderAssociations.data);
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

  //if user id is not equal to the user id of the completed order. (e.g. different logins on the same computer)
  if (user.id !== newOrder.userId) return <p>Not allowed to see this!</p>;

  if (!user.id)
    return (
      <div className="productsContainer">
        <MuiLoader />
      </div>
    );
  if (!newOrder.id)
    return (
      <div className="productsContainer">
        <MuiLoader />
      </div>
    );

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Thank you for your patronage!</h2>
      <h4>Here is your order summary:</h4>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid>
          <Card
            variant="outlined"
            style={{
              margin: "10px",
              justifyContent: "center",
              padding: "10px",
              textAlign: "center",
              alignItems: "center",
              maxWidth: "400px",
            }}
          >
            <Typography variant="h5">
              <div>Order Number: {newOrder.id}</div>
              <div>Date Ordered: {newOrder.createdAt.split("T")[0]}</div>
              <div>Total Price: ${(newOrder.price / 100).toFixed(2)}</div>
              <div>Order Status: {newOrder.orderStatus}</div>
            </Typography>
            <div>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Expand Order Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {newOrder.cartItems.map((cartItem) => {
                    return (
                      <UserOrdersDetails
                        key={cartItem.id}
                        cartItem={cartItem}
                      />
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default CompletedOrder;
