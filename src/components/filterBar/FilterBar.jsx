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
            sx={{ boxShadow: 5, width: '200px', padding:"15px", outline: '1px solid',
            outlineColor: 'rgb(54, 54, 54)'}}
            >
            <h2>
                Filter by...
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