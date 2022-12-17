/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';

const GenreFilter = ({ setGenreFilter }) => {
    const [actionDisabled, setActionDisabled] = useState(false);
    const [actionIsSelected, setActionIsSelected] = useState(false)
    const [adventureDisabled, setAdventureDisabled] = useState(false);
    const [adventureIsSelected, setAdventureIsSelected] = useState(false)
    const [horrorDisabled, setHorrorDisabled] = useState(false);
    const [horrorIsSelected, setHorrorIsSelected] = useState(false)
    const formControlLabelStyle = {
        "& .MuiFormControlLabel-label": {
          fontFamily: "'Dogfish', sans-serif",
          letterSpacing: "2px"
        }
      }
    const handleGenreFilter = (event) => {
        if(event.target.value === 'action'){
            if(!actionIsSelected){
                setGenreFilter('action')
                setAdventureDisabled(true)
                setHorrorDisabled(true)
                setActionIsSelected(true)
            } else {
                setGenreFilter('none')
                setActionIsSelected(false)
                setAdventureDisabled(false)
                setHorrorDisabled(false)
            }
        } else if(event.target.value === 'adventure'){
            if (!adventureIsSelected){
                setGenreFilter('adventure')
                setActionDisabled(true)
                setHorrorDisabled(true)
                setAdventureIsSelected(true)
            } else {
                setGenreFilter('none')
                setAdventureIsSelected(false)
                setActionDisabled(false)
                setHorrorDisabled(false)
            }
        } else if(event.target.value === 'horror'){
            if(!horrorIsSelected){
                setGenreFilter('horror')
                setActionDisabled(true)
                setAdventureDisabled(true)
                setHorrorIsSelected(true)
            }else {
                setGenreFilter('none')
                setHorrorIsSelected(false)
                setActionDisabled(false)
                setAdventureDisabled(false)
            }
        }
    }
    return (
        <div
        className='filterByGenre'
        >
            Genre
            <FormControlLabel
                label="Action"
                sx={{...formControlLabelStyle}}
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
                sx={{...formControlLabelStyle}}
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
                sx={{...formControlLabelStyle}}
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