import { Box, LinearProgress } from '@mui/material';
import React from 'react';

const MuiLoader = () => {
    return (
        <Box sx={{ width: '100%'}}>
        <LinearProgress color="inherit" style={{height:'6px'}}/>
        </Box>
    );
};

export default MuiLoader;