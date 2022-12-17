/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card } from "@mui/material";
import { Rating } from "@mui/material";
import { combineReducers } from 'redux';
import { CompressOutlined } from '@mui/icons-material';
import axios from 'axios';

const UserReview = ({selectedBook, user}) => {

    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const userId = user.id;
    const bookId = selectedBook.id

    const subjectHandler = (event) => {
        setSubject(event.target.value);
    }

    const contentHandler = (event) => {
        setContent(event.target.value);
    }

    const ratingHandler = (event) => {
        setRating(event.target.value)
        console.log(event.target.value)
    }

    const reviewMaker = async (event) => {
        event.preventDefault();
        const reviewData = { subject, content, rating, userId, bookId }
        await axios.post("/api/reviews", reviewData);
    }

    return (
        <div>
        <Card className="cardForAllProducts" sx={{ boxShadow: 2 }}>
            <h1>Leave a Review</h1>
            <div className='formBase'>
                <form>
                    <label>Subject</label>
                    <input onChange={subjectHandler} />
                    <label>Review for {selectedBook.title}</label>
                    <textarea
                    onChange={contentHandler}
                    rows="10"
                    placeholder='Tell us what you think!'></textarea>
                    <label>Rating</label>
                    <Rating name="no-value" defaultValue={1} onChange={ratingHandler} />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            </Card>
        </div>
    );
};

export default UserReview;