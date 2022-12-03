import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';
import './books.css'
const AllBooks = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const books = useSelector((state) => state.book.books)
    const fetchBooks = async () => {
        setLoading(true)
        try{
            const { data } = await axios.get('/api/books')
            console.log(data)
            dispatch(setBooks(data))
        }catch(err){
            console.log(err) //<- not sure if we want the err console logged but fine for dev purposes.
        }
        setLoading(false)
    }
    useEffect(()=> {
        fetchBooks()
    }, []);
    if (loading) return <h1>Loading...</h1>
    return (
        <div
        className='allBooks'
        >   
            {
                books.map((book)=> {
            return(<Card>
                        <img src={book.imageURL} key={book.id} className='book'/>
                    </Card>)
                })
            }
        </div>
    )   
};

export default AllBooks;