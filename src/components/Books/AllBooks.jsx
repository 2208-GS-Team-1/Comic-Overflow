import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';

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
        <div>   
            {
                books.map((book)=> {
                    
                })
            }
        </div>
    )   
};

export default AllBooks;