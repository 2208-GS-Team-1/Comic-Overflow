/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';

const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontFamily: "'Dogfish', sans-serif",
      letterSpacing: "2px"
    }
  }
const PriceFilter = ({ setPriceFilter }) => {
    const [lessThanTenDisabled, setLessThanTenDisabled] = useState(false);
    const [lessThanTenIsSelected, setLessThanTenIsSelected] = useState(false)
    const [betweenTenAndTwentyDisabled, setBetweenTenAndTwentyDisabled] = useState(false);
    const [betweenTenAndTwentyIsSelected, setBetweenTenAndTwentyIsSelected] = useState(false)
    const [moreThanTwentyDisabled, setMoreThanTwentyDisabled] = useState(false);
    const [moreThanTwentyIsSelected, setMoreThanTwentyIsSelected] = useState(false)

    const handlePriceFilter = (event) => {
        if(event.target.value === 'lessThanTen'){
            //If the option is not selected, it filters
            if(!lessThanTenIsSelected){
                setPriceFilter('lessThanTen')
                setBetweenTenAndTwentyDisabled(true)
                setMoreThanTwentyDisabled(true)
                setLessThanTenIsSelected(true)
            } 
            // if the option has been selected it "defilters"
            else {
                setPriceFilter('none')
                setLessThanTenIsSelected(false)
                setBetweenTenAndTwentyDisabled(false)
                setMoreThanTwentyDisabled(false)

            }
    }else if (event.target.value === 'betweenTenAndTwenty'){
        if(!betweenTenAndTwentyIsSelected){
            setPriceFilter('betweenTenAndTwenty')
            setLessThanTenDisabled(true)
            setMoreThanTwentyDisabled(true)
            setBetweenTenAndTwentyIsSelected(true)
        } else {
            setPriceFilter('none')
            setLessThanTenDisabled(false)
            setMoreThanTwentyDisabled(false)
            setBetweenTenAndTwentyIsSelected(false)
        }
    } else if (event.target.value === 'moreThanTwenty'){
        if(!moreThanTwentyIsSelected){
            setPriceFilter('moreThanTwenty')
            setLessThanTenDisabled(true)
            setBetweenTenAndTwentyDisabled(true)
            setMoreThanTwentyIsSelected(true)
        } else {
            setPriceFilter('none')
            setLessThanTenDisabled(false)
            setBetweenTenAndTwentyDisabled(false)
            setMoreThanTwentyIsSelected(false)
        }
    }
}
    return (
        <div
        className='filterByPrice'
        >
            Price
            <FormControlLabel
                label="less than $10"
                sx={{...formControlLabelStyle}}
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
                sx={{...formControlLabelStyle}}
                label="$10 to $20"
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
                sx={{...formControlLabelStyle}}
                label="$20 & above"
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