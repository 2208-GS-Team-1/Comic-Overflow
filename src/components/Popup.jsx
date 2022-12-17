/* eslint-disable react/prop-types */
import React from 'react';

const Popup = (props) => {
    return(props.trigger)? (
        <div className='popup'>
            <div className='popup_inner'>
                <button className='popup_button' onClick={()=>{props.setPopTrigger(false)}}>Close</button>
            <h1>Grand Opening Special!</h1>
            </div>
        </div>
    ): "";
};

export default Popup;