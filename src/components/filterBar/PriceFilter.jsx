import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../../store/bookSlice';

const PriceFilter = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.book.books);
    const [lessThanTenDisabled, setLessThanTenDisabled] = useState(false);
    const [lessThanTenIsSelected, setLessThanTenIsSelected] = useState(false)
    const [betweenTenAndTwentyDisabled, setBetweenTenAndTwentyDisabled] = useState(false);
    const [betweenTenAndTwentyIsSelected, setBetweenTenAndTwentyIsSelected] = useState(false)
    const [moreThanTwentyDisabled, setMoreThanTwentyDisabled] = useState(false);
    const [moreThanTwentyIsSelected, setMoreThanTwentyIsSelected] = useState(false)
    const [allBooksBackup, setAllBooksBackUp] = useState([])
    const getAllBooks = async() => {
       const getAllBooks = await axios.get('/api/books/all/active')
       setAllBooksBackUp(getAllBooks.data)
    }

    const handlePriceFilter = (event) => {
        if(event.target.value === 'lessThanTen'){
            //If the option is not selected, it filters
            if(!lessThanTenIsSelected){
                const filteredBooks = books.filter((book)=> book.price < 1000)
                console.log(filteredBooks)
                dispatch(setBooks(filteredBooks))
                setBetweenTenAndTwentyDisabled(true)
                setMoreThanTwentyDisabled(true)
                setLessThanTenIsSelected(true)
            } 
            // if the option has been selected it "defilters"
            else {
                setLessThanTenIsSelected(false)
                setBetweenTenAndTwentyDisabled(false)
                setBetweenTenAndTwentyDisabled(false)
                dispatch(setBooks(allBooksBackup))
            }
    }
}
    useEffect(()=> {
        getAllBooks();
    }, [])
    return (
        <div
        className='filterByPrice'
        >
            Price
            <FormControlLabel
                label="< $10"
                control={
                <Checkbox
                size="medium" 
                value={'lessThanTen'}
                disabled={lessThanTenDisabled}
                onClick={handlePriceFilter}
                />
                }
                />
                <FormControlLabel
                label="$10 < x < $20"
                control={
                <Checkbox 
                size="medium" 
                value={'betweenTenAndTwenty'}
                disabled={betweenTenAndTwentyDisabled}
                onClick={handlePriceFilter}
                />
                }
                />
                <FormControlLabel
                label="> $20"
                control={
                <Checkbox 
                size="medium" 
                value={'moreThanTwenty'}
                disabled={moreThanTwentyDisabled}
                onClick={handlePriceFilter}
                />
                }
                />
        </div>
    );
};

export default PriceFilter;