import { Button, Card, CardActions } from '@mui/material';
import { sizing } from '@mui/system';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';
import { AddShoppingCart } from '@mui/icons-material';
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
            
                <CardActions>
                {
                    books.map((book)=> {
                        return (
                            <Box
                            >
                                <Card
                                sx={{ boxShadow: 2 }}
                                className='productCard'
                                variant="outlined"
                                >
                                    <div>
                                    <img src={book.imageURL} key={book.id} className='book'/>
                                    </div>
                                    <div
                                    className='productCardButtons'
                                    >
                                        <Button
                                        size='small'
                                        >
                                            <AddShoppingCart/>
                                        </Button>
                                        
                                        <Button
                                        size='small'
                                        >
                                            Info
                                        </Button>
                                    </div>
                                </Card>
                            </Box>
                        )
                    })
                }
                </CardActions>
        </div>
    )   
};

export default AllBooks;