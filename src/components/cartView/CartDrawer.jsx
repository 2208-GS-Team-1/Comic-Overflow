import React, { useEffect, useState } from 'react';
import { Drawer, IconButton, Box, Divider, Card } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from "../../store/cartSlice";
import axios from 'axios';
import MuiLoader from '../MuiLoader';
import "./CartDrawerStyles.css"

// const useStyles = makeStyles({
//   drawer: {
//     width: 240,
//   },
// });

const CartDrawer = () => {
  // const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user)
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useDispatch();
  const getUsersCart = async () => {
    // If user slice is not empty, go fetch the cart
    // (If it is empty, that means not logged in, not handling this situation yet)
    if (user.id) {
      const cart = await axios.get(`/api/cart/user/${user.id}`);
      if(cart){
        dispatch(setCart(cart.data));
      } 
    }
    setLoading(false);
  };
  const handleOpen = async () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const subtract = async cartItem => {
    // If they're deleting their own copy...
    if (cartItem.quantity === 1) {
      // Delete in backend
      await axios.delete(`/api/cart/${cartItem.id}`);
      dispatch(setCart([]))
    } else {
      // Else, just subtract one from quantity in backend
      const updatedQuantity = cartItem.quantity - 1;
      await axios.put(`/api/cart/${cartItem.id}`, {
        quantity: updatedQuantity,
      });
      const newCart = await axios.get(`/api/cart/user/${user.id}`);
      dispatch(setCart(newCart.data))
    }
  }
  const add = async cartItem => {
    // To 'add', just +1 its quantity in the db
    const updatedQuantity = cartItem.quantity + 1;
    
    await axios.put(`/api/cart/${cartItem.id}`, {
      quantity: updatedQuantity,
    });
    
    // Refetch the new cart
    const newCart = await axios.get(`/api/cart/user/${user.id}`);
    dispatch(setCart(newCart.data));
  };
  const handleCheckOut = () => {
    console.log(cart)
  }
  useEffect(() => {
    getUsersCart();
  }, [user]);
  
  if (user.id)
  return (
    <Box
    sx={{ display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            alignItems: 'center',
            width: '400px'
          },
        }}
        >
        <h1>
          Your Cart
        </h1>
        <Divider />
        {/* If loading is true, the cart isn't fetched yet and it will display this MUI loader */}
        {loading && <MuiLoader/>}
        {/* Display the users cart */}
        {cart.length > 0 &&
        <div style={{ overflow: 'auto' }}>
        {cart.map(cartItem => {
          return (
            <div 
            className='cartItem'
            key={cartItem.id}>
              <Card
              sx={{ boxShadow: 6, margin: '8px' }}
              >
                <div
                className='imgAndTitle'
                >
                <p>{cartItem.book.title}</p>
                <img src={cartItem.book.imageURL}/>
                </div>
              </Card>
                <div
                className='quantityAndPrice'
                >
                  <div
                  className='quantityButtons'
                  >
                  <button onClick={() => subtract(cartItem)}>-</button>
                  {cartItem.quantity}
                  <button onClick={() => add(cartItem)}>+</button>
                  </div>
                  price: ${((cartItem.book.price * cartItem.quantity)/100).toFixed(2)}
                </div>
                <Divider />
              </div>
            );
          })}
          </div>
        }
        {cart.length <= 0 && 
        <div>Your cart is empty!</div>
        }
          <div
          className='cartTotal'
          >
            Total: {totalPrice}
          </div>
          <div
          className='checkoutButton'
          >
          <button onClick={handleCheckOut}>Check Out Now</button>
          </div>
      </Drawer>
      <IconButton onClick={handleOpen}><ShoppingCartIcon/></IconButton>
      </Box>
  );
}
export default CartDrawer