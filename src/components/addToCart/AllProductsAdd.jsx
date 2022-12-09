import React from "react";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
const allProductsAdd = ({ bookId }) => {
  const { user } = useSelector(state => state.user);
  const userId = user.id;
  const addToCart = async () => {
    if (!user.id) {
      alert("Please login to add to cart");
    } else {
      const body = { userId, bookId };
      await axios.post("/api/cart", body);
      alert(`${user.firstName}'s cart was updated!`);
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
