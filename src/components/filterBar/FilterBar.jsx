import { Card } from '@mui/material';
import React from 'react';
import AuthorFilter from './AuthorFilter';

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
            <AuthorFilter/>
            </Card>
        </div>
    );
}

export default FilterBar;