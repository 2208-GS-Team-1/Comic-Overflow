/* eslint-disable react/prop-types */
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const UserOrdersDetails = ({ cartItem }) => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const bookData = await axios.get(`/api/books/${cartItem.bookId}`);
      setBook(bookData.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBook();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <Card
      style={{
        margin: "10px",
        border: "solid",
        borderColor: "FFD813",
      }}>
      <CardContent>
        <Typography variant="h6">Title: {book.title}</Typography>
        <div>Volume: {book.volume}</div>
        <div>Quantity: {cartItem.quantity}</div>
        <div>
          Subtotal: ${(cartItem.priceTimesQuantityAtCheckOut / 100).toFixed(2)}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserOrdersDetails;
