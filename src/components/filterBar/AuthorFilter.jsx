/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import './filterBarStyles.css'
const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontFamily: "'Dogfish', sans-serif",
      letterSpacing: "2px"
    }
  }
const AuthorFilter = ({setAuthorFilter }) => {
    const [firstDisabled, setFirstDisabled] = useState(false);
    const [firstIsSelected, setFirstIsSelected] = useState(false)
    const [secondDisabled, setSecondDisabled] = useState(false);
    const [secondIsSelected, setSecondIsSelected] = useState(false)
    const [thirdDisabled, setThirdDisabled] = useState(false);
    const [thirdIsSelected, setThirdIsSelected] = useState(false)
    //This function handles the filtering of authors by the first letter of their first name
    const handleAuthorFilter = (event) => {
        // If value is in the firstThird of the alphabet, it filts authors who's first letter of their first name
        // is included in that array
        if(event.target.value === 'firstThird'){
            //If the option is not selected, it filters
            if(!firstIsSelected){
                setAuthorFilter('firstThird')
                setSecondDisabled(true)
                setThirdDisabled(true)
                setFirstIsSelected(true)
            } 
            // if the option has been selected it "defilters"
            else {
                setAuthorFilter('none')
                setFirstIsSelected(false)
                setSecondDisabled(false)
                setThirdDisabled(false)
            }
        } else if (event.target.value === 'secondThird'){
            if(!secondIsSelected){
                setAuthorFilter('secondThird')
                setFirstDisabled(true)
                setThirdDisabled(true)
                setSecondIsSelected(true)
            } else {
                setAuthorFilter('none')
                setSecondIsSelected(false)
                setFirstDisabled(false)
                setThirdDisabled(false)
            }
        } else if (event.target.value === 'thirdThird'){
            if(!thirdIsSelected){
                setAuthorFilter('thirdThird')
                setFirstDisabled(true)
                setSecondDisabled(true)
                setThirdIsSelected(true)
            } else {
                setAuthorFilter('none')
                setThirdIsSelected(false)
                setFirstDisabled(false)
                setSecondDisabled(false)
            }
        }
    }
    return (
                <div
                className='filterByAuthor'
                >
                Author
                <FormControlLabel
                label="A-H"
                sx={{...formControlLabelStyle}}
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
                sx={{...formControlLabelStyle}}
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
                sx={{...formControlLabelStyle}}
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
    );
};

export default AuthorFilter;