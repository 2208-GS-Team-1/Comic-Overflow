import { Card, Divider } from '@mui/material';
import React from 'react';
import AuthorFilter from './AuthorFilter';
import GenreFilter from './GenreFilter';
import './filterBarStyles.css'

const FilterBar = () => {

    return (
        <div
        className='filterContainer'
        >
            <Card
            sx={{ boxShadow: 5, width: '200px', padding:"15px" }}
            >
            <h2>
                Fitler by...
            </h2>
            <div
            className='filterOptions'
            >
            <div>
            <AuthorFilter/>
            </div>
            <Divider/>
            <div>
            <GenreFilter/>
            </div>
            </div>
            </Card>
        </div>
    );
}

export default FilterBar;