import React from "react";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "../../store/cartSlice";
const allProductsAdd = ({ bookId }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
//   const { cart } = useSelector((state) => state.cart);
  const userId = user.id;
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
            alert("Please login to add to cart");
        } else {
            // existingItem will either return the object its looking for (truthy)
            // or undefined (falsy)
            const existingItem = cart.find((cartItem) => cartItem.book.id === bookId);
            if(existingItem) {  
                console.log(existingItem)
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
      <Button size="small" onClick={addToCart}>
        <AddShoppingCart />
      </Button>
    </>
  );
};

export default allProductsAdd;
