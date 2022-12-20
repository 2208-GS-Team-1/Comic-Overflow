/* eslint-disable react/prop-types */
import React from 'react';

const Popup = (props) => {
    return(props.trigger)? (
        <div className='popup'>
            <div className='popup_inner' >
                <button className='popup_button' onClick={()=>{props.setPopTrigger(false)}}>Close</button>
            <h1 className='popupH1'>Holiday Special!</h1>
            <h2 className='popupH2'>We will donate 10% of the sale between </h2>
            <h2 className='popupH2'>12/19 - 12/24 to families in need</h2>
            <h2 className='popupH2'>Give the gift of Love!</h2>
            </div>
        </div>
    ): "";
};

export default Popup;