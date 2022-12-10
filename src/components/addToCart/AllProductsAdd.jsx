import React from "react";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
const allProductsAdd = ({ book }) => {
  const { user } = useSelector((state) => state.user);
  const userId = user.id;
  const addToCart = async () => {
    //if user is not logged in and there is stock, add to local storage
    if (!user.id && book.stock) {
      localStorage.setItem(book, JSON.stringify(book));
    } else {
      const bookId = book.id;
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
