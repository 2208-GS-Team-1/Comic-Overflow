import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Box,
  Divider,
  Card,
  Badge,
  styled,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/cartSlice";
import axios from "axios";
import "./CartDrawerStyles.css";
import { useEffect } from "react";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid black`,
    padding: "0 4px",
    color: "black",
    backgroundColor: "rgb(255, 216, 19)",
  },
}));
const CartDrawer = () => {
  // const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // First, define a function that loads the cart from local storage
  const loadCartFromLocalStorage = () => {
    // Get the stringified cart from local storage
    const cartString = localStorage.getItem("cart");
    if (!cartString) {
      const emptyCart = JSON.stringify([]);
      localStorage.setItem("cart", emptyCart);
      const newCart = localStorage.getItem("cart");
      const cart = JSON.parse(newCart);
      dispatch(setCart(cart));
    } else {
      // Parse the stringified cart to get the original cart object
      const cart = JSON.parse(cartString);
      // Return the cart object
      dispatch(setCart(cart));
    }
  };

  const totalItems = cart.reduce((total, index) => total + index.quantity, 0);

  //handleOpen toggles the drawer to open BUT also calcuates the price... its the only way I could make the total work
  const handleOpen = async () => {
    setIsOpen(true);
    const totalPriceCalc = cart.reduce(
      (total, index) => (total = total + index.quantity * index.book.price),
      0
    );
    setTotalPrice(totalPriceCalc);
  };
  // closes drawer
  const handleClose = () => {
    setIsOpen(false);
  };

  const saveCartToLocalStorage = (cart) => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);

    // Now we can save the stringified cart to local storage
    localStorage.setItem("cart", cartString);
  };

  //subtracts from quantity

  const subtract = async (cartItem) => {
    // if a user is signed in
    if (user.id) {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      // If they're deleting their last copy from their cart...
      if (cartItem.quantity === 1) {
        // Delete in backend
        await axios.delete(`/api/cart/${cartItem.id}`, config);
        // Create a new array of cart items by filtering out the item that was deleted
        const newCart = cart.filter((item) => item.id !== cartItem.id);
        // Dispatch the new cart array to the Redux store
        dispatch(setCart(newCart));
        saveCartToLocalStorage(newCart);
      } else {
        // Else, just subtract one from quantity in backend
        const updatedQuantity = cartItem.quantity - 1;
        await axios.put(
          `/api/cart/${cartItem.id}`,
          {
            quantity: updatedQuantity,
          },
          config
        );
        //This map might seem redundant, but without it each time the cart quantities are decremented the array would come back in a differet order,
        // so all the products would move each decrement or increment. Now with this we're keeping the array in place
        const newCart = cart.map((item) => {
          if (item.id === cartItem.id) {
            return {
              ...item,
              quantity: updatedQuantity,
            };
          }
          return item;
        });

        // Dispatch the new cart array to the Redux store
        dispatch(setCart(newCart));
        saveCartToLocalStorage(newCart);
      }
      const updatedTotalPrice = totalPrice - cartItem.book.price;
      setTotalPrice(updatedTotalPrice);
    } else {
      //else its a guest cart
      if (cartItem.quantity === 1) {
        const newCart = cart.filter(
          (item) => item.book.id !== cartItem.book.id
        );
        dispatch(setCart(newCart));
        saveCartToLocalStorage(newCart);
      } else {
        const updatedQuantity = cartItem.quantity - 1;

        const newCart = cart.map((item) => {
          if (item.book.id === cartItem.book.id) {
            return {
              ...item,
              quantity: updatedQuantity,
            };
          }
          return item;
        });
        dispatch(setCart(newCart));
        saveCartToLocalStorage(newCart);
      }
      const updatedTotalPrice = totalPrice - cartItem.book.price;
      setTotalPrice(updatedTotalPrice);
    }
  };

  const add = async (cartItem) => {
    // For logged in user AND store has enough stock to allow this:
    if (user.id && cartItem.book.stock >= cartItem.quantity + 1) {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      // To 'add', just +1 its quantity in the db
      const updatedQuantity = cartItem.quantity + 1;
      await axios.put(
        `/api/cart/${cartItem.id}`,
        {
          quantity: updatedQuantity,
        },
        config
      );

      //This map might seem redundant, but without it each time the cart quantities are decremented the array would come back in a differet order,
      // so all the products would move each decrement or increment. Now with this we're keeping the array in place
      const newCart = cart.map((item) => {
        if (item.id === cartItem.id) {
          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      });

      // Dispatch the new cart array to the Redux store
      dispatch(setCart(newCart));
      saveCartToLocalStorage(newCart);
      const updatedTotalPrice = totalPrice + cartItem.book.price;

      // Update the total price state variable
      setTotalPrice(updatedTotalPrice);
    }

    // else we edit the guests cart
    else {
      if (cartItem.book.stock >= cartItem.quantity + 1) {
        const updatedQuantity = cartItem.quantity + 1;

        const newCart = cart.map((item) => {
          if (item.book.id === cartItem.book.id) {
            return {
              ...item,
              quantity: updatedQuantity,
            };
          }
          return item;
        });
        dispatch(setCart(newCart));
        saveCartToLocalStorage(newCart);
        const updatedTotalPrice = totalPrice + cartItem.book.price;

        // Update the total price state variable
        setTotalPrice(updatedTotalPrice);
      }
    }
  };

  const handleCheckOut = async () => {
    if (user.id) {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      const res = await axios.post(`/api/cart/stripeCheckout`, cart, config);
      let url = res.data.url;
      //take user to the Stripe checkout site
      window.location = url;

      //       const token = window.localStorage.getItem("token");
      //       await axios.get(`/api/cart/user/${user.id}/checkOut`, {
      //         headers: {
      //           authorization: "Bearer " + token,
      //         },
      //       });

      //       setTotalPrice(0);
      //       dispatch(setCart([]));
      //       saveCartToLocalStorage([]);
    } else {
      alert("please sign in to checkout!");
    }
  };
  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            alignItems: "center",
            width: "400px",
          },
        }}
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {user.id ? <h1>{user.firstName}'s Cart</h1> : <h1>Guest Cart</h1>}
        <Divider />
        {/* If loading is true, the cart isn't fetched yet and it will display this MUI loader */}
        {/* Display the users cart */}
        <div style={{ overflow: "auto" }}>
          {!cart && <div>your cart is empty!</div>}
          {cart &&
            cart.map((cartItem) => {
              return (
                <div className="cartItem" key={cartItem.book.id}>
                  <Card sx={{ boxShadow: 6, margin: "8px" }}>
                    <div className="imgAndTitle">
                      <p>{cartItem.book.title}</p>
                      <img src={cartItem.book.imageURL} />
                    </div>
                  </Card>
                  <div className="quantityAndPrice">
                    <div className="quantityButtons">
                      <button onClick={() => subtract(cartItem)}>-</button>
                      {cartItem.quantity}
                      <button onClick={() => add(cartItem)}>+</button>
                    </div>
                    price: $
                    {((cartItem.book.price * cartItem.quantity) / 100).toFixed(
                      2
                    )}
                  </div>
                  <Divider />
                </div>
              );
            })}
        </div>
        <div className="cartTotal">Total: ${(totalPrice / 100).toFixed(2)}</div>
        <div className="checkoutButton">
          <button
            disabled={!cart || cart.length == 0 ? true : false}
            onClick={handleCheckOut}
          >
            Check Out Now
          </button>
        </div>
      </Drawer>
      <IconButton onClick={handleOpen}>
        <StyledBadge badgeContent={totalItems} max={99}>
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Box>
  );
};
export default CartDrawer;
