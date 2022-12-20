/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Rating } from "@mui/material";
import axios from 'axios';
import { Alert } from "@mui/material";

const UserReview = ({book, user, handleAllReviews}) => {

    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const [errorMessage, setErrorMessage] = useState(false);
    const userId = user.id;
    const bookId = book.id

    const subjectHandler = (event) => {
        setSubject(event.target.value);
    }

    const contentHandler = (event) => {
        setContent(event.target.value);
    }

    const ratingHandler = (event) => {
        setRating(event.target.value)
    }

    const reviewMaker = async (event) => {
        try {
            event.preventDefault();
            const reviewData = { subject, content, rating, userId, bookId }
            await axios.post("/api/reviews", reviewData);
            handleAllReviews();
        } catch (error) {
            setErrorMessage(true);
        }
    }

    return (
        <div className='reviewformContainer'>
            <h1>Leave a Review</h1>
            <div className='reviewformBase'>
                <form className='innerreviewformBase' onSubmit={reviewMaker}>
                    <label className='reviewLabel'>Subject</label>
                    <input onChange={subjectHandler}
                    placeholder='Enter subject' />
                    <label className='reviewLabel'>Review for {book.title}</label>
                    <textarea
                    onChange={contentHandler}
                    rows="10"
                    placeholder='Tell us what you think!'></textarea>
                    <label className='reviewLabel'>Rating</label>
                    <Rating name="no-value" defaultValue={1} onChange={ratingHandler} />
                    <button className='reviewbutton' type='submit'>Submit</button>
                    {errorMessage && (
                    <Alert severity="error" sx={{ marginTop: "5px" }}>
                        Please fill out the review completely!
                    </Alert>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserReview;