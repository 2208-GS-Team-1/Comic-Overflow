import React from "react";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart, addBookToCart } from "../../store/cartSlice";
import { useState } from "react";
const allProductsAdd = ({ bookId }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
    const reduxCart = useSelector((state) => state.cart.cart);
  const userId = user.id;
  const [btnDisabled, setBtnDisabled] = useState(false)
  const loadCartFromLocalStorage = () => {
    // Get the stringified cart from local storage
    const cartString = localStorage.getItem('cart');
  
    // Parse the stringified cart to get the original cart object
    const cart = JSON.parse(cartString);
  
    // Return the cart object
    return cart;
  };
  const saveCartToLocalStorage = cart => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);
  
    // Now we can save the stringified cart to local storage
    localStorage.setItem('cart', cartString);
  };

  const cart = loadCartFromLocalStorage();
  const addToCart = async () => {
    try {
        if (!user.id) {
                setBtnDisabled(true)
                const { data }= await axios.get(`/api/books/${bookId}`)
                const bookAndQuantity = {quantity: 1, book:data}
                dispatch(addBookToCart(bookAndQuantity))
                saveCartToLocalStorage(bookAndQuantity)

        } else {
            // existingItem will either return the object its looking for (truthy)
            // or undefined (falsy)
            const existingItem = cart.find((cartItem) => cartItem.book.id === bookId);
            if(existingItem) {  
                await axios.put(`/api/cart/${existingItem.id}`, {
                    quantity: existingItem.quantity + 1,
                });
                const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                dispatch(setCart(updatedCart.data))
                saveCartToLocalStorage(updatedCart.data)
            } else {
                const body = { userId, bookId };
                await axios.post("/api/cart", body);
                const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                dispatch(setCart(updatedCart.data))
                saveCartToLocalStorage(updatedCart.data)
            }
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
      <Button 
      disabled={btnDisabled}
      size="small" onClick={addToCart}>
        <AddShoppingCart />
      </Button>
    </>
  );
};

export default allProductsAdd;
