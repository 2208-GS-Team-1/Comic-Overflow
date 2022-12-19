/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart, addBookToCart } from "../../store/cartSlice";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const SingleProductAdd = ({ book, quantity }) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)
  const [open, setOpen] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const userId = user.id;
  const loadCartFromLocalStorage = () => {
    // Get the stringified cart from local storage
    const cartString = localStorage.getItem('cart');
  
    // Parse the stringified cart to get the original cart object
    const cart = JSON.parse(cartString);
  
    // Return the cart object
    dispatch(setCart(cart))
  };
  const saveCartToLocalStorage = cart => {
    // Local storage can only store strings, so we need to convert the cart object to a string
    const cartString = JSON.stringify(cart);
  
    // Now we can save the stringified cart to local storage
    localStorage.setItem('cart', cartString);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  useEffect(()=> {
    loadCartFromLocalStorage()
  },[])
  const addToCart = async () => {
      try {
          if (!user.id) {
              const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
                  if(existingItem && existingItem.book.stock >= existingItem.quantity + quantity && quantity !== 0) {
                    const updatedQuantity = existingItem.quantity + quantity
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
            } else if(existingItem && existingItem.book.stock < existingItem.quantity + quantity && quantity !== 0){
                const updatedQuantity = existingItem.book.stock
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
                setAlertType('warning')
                setAlertMessage('Not enough stock!')
                setOpen(true)
            }
            else if(!existingItem) {
                const { data } = await axios.get(`/api/books/${book.id}`)
                if(data.stock >= quantity){
                    const bookAndQuantity = {quantity: quantity, book:data}
                    dispatch(addBookToCart(bookAndQuantity))
                    saveCartToLocalStorage([...cart, bookAndQuantity])
                    setAlertType('success')
                    setAlertMessage('Added to cart!')
                    setOpen(true)
                } else if (data.stock < quantity){
                    const bookAndQuantity = {quantity: data.stock, book:data}
                    dispatch(addBookToCart(bookAndQuantity))
                    saveCartToLocalStorage([...cart, bookAndQuantity])
                    setAlertType('warning')
                    setAlertMessage('Not enough stock!')
                    setOpen(true)
                }
            }
        } else if (user.id) {
            const existingItem = cart.find((cartItem) => cartItem.book.id === book.id);
            if(existingItem){
                const quantityToAdd = Number(quantity + existingItem.quantity)
                if(existingItem.book.stock >= quantityToAdd){
                    await axios.put(`/api/cart/${existingItem.id}`,{
                        quantity: quantityToAdd
                    })
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                    setAlertType('success')
                    setAlertMessage('Added to cart!')
                    setOpen(true)
                } else if (existingItem.book.stock < quantityToAdd){
                    await axios.put(`/api/cart/${existingItem.id}`,{
                        quantity: existingItem.book.stock
                    })
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                    setAlertType('warning')
                    setAlertMessage('Not enough stock!')
                    setOpen(true)
                }
            } else if(!existingItem){
                const foundBook = await axios.get(`/api/books/${book.id}`)
                const bookToAdd = foundBook.data
                const bookId = book.id
                if(bookToAdd.stock >= quantity){
                    const quantityToAdd = Number(quantity)
                    const body = { userId, bookId, quantityToAdd };
                    await axios.post("/api/cart/quantity", body);
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                    setAlertType('success')
                    setAlertMessage('Added to cart!')
                    setOpen(true)
                } else if(bookToAdd.stock < quantity){
                    const quantityToAdd = bookToAdd.stock
                    const body = { userId, bookId, quantityToAdd };
                    await axios.post("/api/cart/quantity", body);
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                    saveCartToLocalStorage(updatedCart.data)
                    setAlertType('warning')
                    setAlertMessage('Not enough stock!')
                    setOpen(true)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <>
      <Button 
      disabled={book.stock === 0 && true}
      size="small" onClick={addToCart}>
        {book.stock !== 0 ? <AddShoppingCart /> : <ProductionQuantityLimitsIcon/> }
      </Button>
      <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{vertical:'bottom', horizontal:'center'}}
              >
              <Alert sx={{ display: "flex", justifyContent: "center",minWidth:"200px",fontFamily: "'Dogfish', sans-serif"}} 
              variant="filled" 
              severity={alertType}>
                {alertMessage}
              </Alert>
          </Snackbar>
    </>
  );
};

export default SingleProductAdd;
