/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart, addBookToCart } from "../../store/cartSlice";
<<<<<<< HEAD
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
=======
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useState } from "react";
>>>>>>> origin/main
const AllProductsAdd = ({ book }) => {
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);
  const userId = user.id;
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
  const saveCartToLocalStorage = cart => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);

    // Now we can save the stringified cart to local storage
    localStorage.setItem("cart", cartString);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);
  const addToCart = async () => {
<<<<<<< HEAD
    try {
      // If it is a guest user adding to cart... (not logged in)
      if (!user.id) {
        const existingItem = cart.find(
          cartItem => cartItem.book.id === book.id
        );
        if (
          existingItem &&
          existingItem.book.stock >= existingItem.quantity + 1
        ) {
          const updatedQuantity = existingItem.quantity + 1;
          const newCart = cart.map(item => {
            if (item.book.id === existingItem.book.id) {
              return {
                ...item,
                quantity: updatedQuantity,
              };
=======
      try {
          if (!user.id) {
              const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
              if(existingItem && existingItem.book.stock >= existingItem.quantity + 1) {
                const updatedQuantity = existingItem.quantity + 1
                const newCart = cart.map(item => {
                    if (item.book.id === existingItem.book.id) {
                        return {
                            ...item,
                            quantity: updatedQuantity,
                        };
                    }
                    return item;
                });
                dispatch(setCart(newCart))
                saveCartToLocalStorage(newCart)
                setAlertType('success')
                setAlertMessage('Added to cart!')
                setOpen(true)
            }else 
            if(!existingItem) {
                const { data }= await axios.get(`/api/books/${book.id}`)
                const bookAndQuantity = {quantity: 1, book:data}
                dispatch(addBookToCart(bookAndQuantity))
                saveCartToLocalStorage([...cart, bookAndQuantity])
                setAlertType('success')
                setAlertMessage('Added to cart!')
                setOpen(true)
            } else {
              setAlertType('warning')
              setAlertMessage('Not enough stock!')
              setOpen(true)
            }
        } else {
            const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
            if(existingItem && existingItem.book.stock >= existingItem.quantity + 1) {
                await axios.put(`/api/cart/${existingItem.id}`, {
                    quantity: existingItem.quantity + 1,
                });
                const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                dispatch(setCart(updatedCart.data))
                saveCartToLocalStorage(updatedCart.data)
                setAlertType('success')
                setAlertMessage('Added to cart!')
                setOpen(true)
            } else if (!existingItem){
                const bookId = book.id
                const body = { userId, bookId };
                await axios.post("/api/cart", body);
                const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                dispatch(setCart(updatedCart.data))
                saveCartToLocalStorage(updatedCart.data)
                setAlertType('success')
                setAlertMessage('Added to cart!')
                setOpen(true)
            } else {
              setAlertType('warning')
              setAlertMessage('Not enough stock!')
              setOpen(true)
>>>>>>> origin/main
            }
            return item;
          });
          dispatch(setCart(newCart));
          saveCartToLocalStorage(newCart);
        } else if (!existingItem) {
          const { data } = await axios.get(`/api/books/${book.id}`);
          const bookAndQuantity = { quantity: 1, book: data };
          dispatch(addBookToCart(bookAndQuantity));
          saveCartToLocalStorage([...cart, bookAndQuantity]);
        }
      } else {
        // If the user IS logged, we need to create/update cartItem in the backend
        // JWT & authorization header to give for authorization check in the API
        const token = window.localStorage.getItem("token");
        const config = { headers: { authorization: "Bearer " + token } };

        const existingItem = cart.find(
          cartItem => cartItem.book.id === book.id
        );
        if (
          existingItem &&
          existingItem.book.stock >= existingItem.quantity + 1
        ) {
          await axios.put(
            `/api/cart/${existingItem.id}`,
            { quantity: existingItem.quantity + 1 },
            config
          );
          const updatedCart = await axios.get(
            `/api/cart/user/${user.id}`,
            config
          );
          dispatch(setCart(updatedCart.data));
          saveCartToLocalStorage(updatedCart.data);
        } else if (!existingItem) {
          const bookId = book.id;
          const body = { userId, bookId };
          await axios.post("/api/cart", body, config);
          const updatedCart = await axios.get(
            `/api/cart/user/${user.id}`,
            config
          );
          dispatch(setCart(updatedCart.data));
          saveCartToLocalStorage(updatedCart.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
<<<<<<< HEAD
      <Button
        disabled={book.stock === 0 && true}
        size="small"
        onClick={addToCart}
      >
        {book.stock !== 0 ? (
          <AddShoppingCart />
        ) : (
          <ProductionQuantityLimitsIcon />
        )}
=======
      <Button 
      disabled={book.stock === 0 && true}
      size="small" onClick={addToCart}>
        {book.stock !== 0 ? <AddShoppingCart /> : <ProductionQuantityLimitsIcon/> }
>>>>>>> origin/main
      </Button>
      <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              >
              <Alert sx={{ display: "flex", justifyContent: "center",minWidth:"200px", fontFamily: "'Dogfish', sans-serif"}} 
              variant="filled" 
              severity={alertType}>
                {alertMessage}
              </Alert>
          </Snackbar>
    </>

  );
};

export default AllProductsAdd;
