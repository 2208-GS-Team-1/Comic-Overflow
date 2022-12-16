import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';
import './filterBarStyles.css'

const firstThird = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h'];
const secondThird = ['i', 'j', 'k', 'l', 'm', 'n','o', 'p', ];
const thirdThird = ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const AuthorFilter = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const [firstDisabled, setFirstDisabled] = useState(false);
    const [firstIsSelected, setFirstIsSelected] = useState(false)
    const [secondDisabled, setSecondDisabled] = useState(false);
    const [secondIsSelected, setSecondIsSelected] = useState(false)
    const [thirdDisabled, setThirdDisabled] = useState(false);
    const [thirdIsSelected, setThirdIsSelected] = useState(false)
    const [allBooksBackup, setAllBooksBackUp] = useState([])
    const getAllBooks = async() => {
       const getAllBooks = await axios.get('/api/books')
       setAllBooksBackUp(getAllBooks.data)
    }
    //This function handles the filtering of authors by the first letter of their first name
    const handleAuthorFilter = (event) => {
        // If value is in the firstThird of the alphabet, it filts authors who's first letter of their first name
        // is included in that array
        if(event.target.value === 'firstThird'){
            //If the option is not selected, it filters
            if(!firstIsSelected){
                const filteredBooks = books.filter((book)=> 
                firstThird.includes(book.author[0].toLowerCase()))
                dispatch(setBooks(filteredBooks))
                setSecondDisabled(true)
                setThirdDisabled(true)
                setFirstIsSelected(true)
            } 
            // if the option has been selected it "defilters"
            else {
                setFirstIsSelected(false)
                setSecondDisabled(false)
                setThirdDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        } else if (event.target.value === 'secondThird'){
            if(!secondIsSelected){
                const filteredBooks = books.filter((book)=> 
                secondThird.includes(book.author[0].toLowerCase()))
                dispatch(setBooks(filteredBooks))
                setFirstDisabled(true)
                setThirdDisabled(true)
                setSecondIsSelected(true)
            } else {
                setSecondIsSelected(false)
                setFirstDisabled(false)
                setThirdDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        } else if (event.target.value === 'thirdThird'){
            if(!thirdIsSelected){
                const filteredBooks = books.filter((book)=> 
                thirdThird.includes(book.author[0].toLowerCase()))
                dispatch(setBooks(filteredBooks))
                setFirstDisabled(true)
                setSecondDisabled(true)
                setThirdIsSelected(true)
            } else {
                setThirdIsSelected(false)
                setFirstDisabled(false)
                setSecondDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
        }
    }
    useEffect(()=> {
        getAllBooks();
    }, [])
    return (
        <div>
            <div
            className='filterOptions'
            >
                <div
                className='filterByAuthor'
                >
                Author
                <FormControlLabel
                label="A-H"
                control={
                <Checkbox 
                disabled={firstDisabled}
                size="medium" 
                value={`firstThird`}
                onClick={handleAuthorFilter}
                />
                }
                />
                <FormControlLabel
                label="I-P"
                control={
                <Checkbox 
                size="medium" 
                value={'secondThird'}
                disabled={secondDisabled}
                onClick={handleAuthorFilter}
                />
                }
                />
                <FormControlLabel
                label="Q-Z"
                control={
                <Checkbox 
                size="medium" 
                disabled={thirdDisabled}
                value={'thirdThird'}
                onClick={handleAuthorFilter}
                />
                }
                />
                </div>
            </div>
        </div>
    );
};

export default AuthorFilter;