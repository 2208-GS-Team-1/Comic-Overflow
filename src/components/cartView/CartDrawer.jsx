import React, { useEffect, useState } from 'react';
import { Drawer, IconButton, Box, Divider, List, ListItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from "../../store/cartSlice";
import axios from 'axios';
import MuiLoader from '../MuiLoader';

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
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUsersCart = async () => {
    // If user slice is not empty, go fetch the cart
    // (If it is empty, that means not logged in, not handling this situation yet)
    if (user.id) {
      const cart = await axios.get(`/api/cart/user/${user.id}`);
      console.log(cart.data)
      dispatch(setCart(cart.data));
      setLoading(false);
    }
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getUsersCart();
  }, [user]);
  // If user is signed in and cart has stuff in it display this

  if (user.id && cart.length > 0)
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
            width: 400,
            alignItems: 'center',
          },
        }}
      >
        <h1>
          Your Cart
        </h1>
        <Divider
        sx={{width:"400px"}}
        />
        {/* If loading is true, the cart isn't fetched yet and it will display this MUI loader */}
        {loading && <MuiLoader/>}
        {/* Display the users cart */}
      </Drawer>
      <IconButton onClick={handleOpen}><ShoppingCartIcon/></IconButton>
      </Box>
  );
}

export default CartDrawer