import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';

const GenreFilter = () => {
    const books = useSelector(state => state.book.books);
    const [actionDisabled, setActionDisabled] = useState(false);
    const [actionIsSelected, setActionIsSelected] = useState(false)
    const [adventureDisabled, setAdventureDisabled] = useState(false);
    const [adventureIsSelected, setAdventureIsSelected] = useState(false)
    const [horrorDisabled, setHorrorDisabled] = useState(false);
    const [horrorIsSelected, setHorrorIsSelected] = useState(false)
    const [allBooksBackup, setAllBooksBackUp] = useState([])
    const dispatch = useDispatch();
    const getAllBooks = async() => {
        const getAllBooks = await axios.get('/api/books/all/active')
        setAllBooksBackUp(getAllBooks.data)
     }
    const handleGenreFilter = (event) => {
        if(event.target.value === 'action'){
            if(!actionIsSelected){
                const filteredBooks = books.filter((book)=> 
                book.genre.toLowerCase() === 'action')
                dispatch(setBooks(filteredBooks))
                setAdventureDisabled(true)
                setHorrorDisabled(true)
                setActionIsSelected(true)
            } else {
                setActionIsSelected(false)
                setAdventureDisabled(false)
                setHorrorDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        } else if(event.target.value === 'adventure'){
            if (!adventureIsSelected){
                const filteredBooks = books.filter((book)=> 
                book.genre.toLowerCase() === 'adventure')
                dispatch(setBooks(filteredBooks))
                setActionDisabled(true)
                setHorrorDisabled(true)
                setAdventureIsSelected(true)
            } else {
                setAdventureIsSelected(false)
                setActionDisabled(false)
                setHorrorDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        } else if(event.target.value === 'horror'){
            if(!horrorIsSelected){
                const filteredBooks = books.filter((book)=> 
                book.genre.toLowerCase() === 'horror')
                console.log(filteredBooks)
                dispatch(setBooks(filteredBooks))
                setActionDisabled(true)
                setAdventureDisabled(true)
                setHorrorIsSelected(true)
            }else {
                setHorrorIsSelected(false)
                setActionDisabled(false)
                setAdventureDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        }
    }
    useEffect(()=> {
        getAllBooks();
    }, [])
    return (
        <div
        className='filterByGenre'
        >
            Genre
            <FormControlLabel
                label="Action"
                control={
                <Checkbox
                size="medium" 
                value={'action'}
                disabled={actionDisabled}
                onClick={handleGenreFilter}
                />
                }
                />
                <FormControlLabel
                label="Adventure"
                control={
                <Checkbox 
                size="medium" 
                value={'adventure'}
                disabled={adventureDisabled}
                onClick={handleGenreFilter}
                />
                }
                />
                <FormControlLabel
                label="Horror"
                control={
                <Checkbox 
                size="medium" 
                value={'horror'}
                disabled={horrorDisabled}
                onClick={handleGenreFilter}
                />
                }
                />
        </div>
    );
};

export default GenreFilter;