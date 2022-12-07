import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './userPage.css'

const EditUser = () => {
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user.user);
    const id = user.id
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setNumber] = useState(user.phoneNumber)
    const [loading, setLoading] = useState(false)

    const addressHandler = (event) =>{
        setAddress(event.target.value);
    }
    const emailHandler = (event) =>{
        setEmail(event.target.value);
    }
    const numberHandler = (event) => {
        setNumber(event.target.value)
    }

    const updateHandler = async (event) =>{
        event.preventDefault();
        const updateData = { address, email, phoneNumber}
        await axios.put(`api/users/${id}`, updateData)
        console.log("update is complete")
        navigate("/myAccount")
    }

    useEffect(()=>{
        setLoading(true)
    })

    if(loading){
        return (
            <div className='formBase'>
                <div className='formDetail'>
                <form onSubmit={updateHandler}>
                    <h1>{user.firstName} {user.lastName}'s Account</h1>
                    <div className='formInput'>
                        <input className='editInput' value={address} onChange={addressHandler}/>
                        <input className='editInput' value={email} onChange={emailHandler} />
                        <input className='editInput' value={phoneNumber} onChange={numberHandler} />
                        <button className='accountButton' >Submit</button>
                    </div>
                </form>
                </div>
            </div>
        );
    }
};

export default EditUser;