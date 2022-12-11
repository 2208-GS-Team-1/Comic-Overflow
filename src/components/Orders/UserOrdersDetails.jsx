/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const UserOrdersDetails = ({ cartItem }) => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState([]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const bookData = await axios.get(`/api/books/${cartItem.id}`);
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
    <div style={{ border: "5px", borderColor: "black", borderStyle: "solid" }}>
      <div>Book Title: {book.title}</div>
      <div>Volume: {book.volume}</div>
      <div>Quantity: {cartItem.quantity}</div>
      <div>
        Subtotal: ${(cartItem.priceTimesQuantityAtCheckOut / 100).toFixed(2)}
      </div>
    </div>
  );
};

export default UserOrdersDetails;
