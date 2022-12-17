/* eslint-disable react/prop-types */
import { Card, Divider } from '@mui/material';
import React from 'react';
import AuthorFilter from './AuthorFilter';
import GenreFilter from './GenreFilter';
import './filterBarStyles.css'
import PriceFilter from './PriceFilter';

const FilterBar = ({ setAuthorFilter, setGenreFilter, setPriceFilter  }) => {

    return (
        <div
        className='filterContainer'
        >
            <Card
            sx={{ boxShadow: 5, width: '175px', padding:"15px" }}
            >
            <h2>
                Fitler by...
            </h2>
            <Divider/>
            <div
            className='filterOptions'
            >
            <div>
            <AuthorFilter setAuthorFilter={setAuthorFilter}/>
            </div>
            <Divider/>
            <div>
            <GenreFilter setGenreFilter={setGenreFilter} />
            </div>
            <Divider/>
            <div>
                <PriceFilter setPriceFilter={setPriceFilter}/>
            </div>
            </div>
            </Card>
        </div>
    );
}

export default FilterBar;