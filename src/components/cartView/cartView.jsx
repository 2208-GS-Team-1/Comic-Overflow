import React from 'react';
import { useSelector } from 'react-redux';

const cartView = () => {
    const cart = useSelector(state => state.cart.cart)
    return (
        <div>
            
        </div>
    );
};

export default cartView;