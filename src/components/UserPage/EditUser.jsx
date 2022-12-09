/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './userPage.css'
import { setUser } from '../../store/userSlice';

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user);
    const id = user.id
    const [address, setAddress] = useState(user.address);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setNumber] = useState(user.phoneNumber)


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
        const userData = await axios.get(`/api/users/${id}`)
       dispatch(setUser(userData.data));
        console.log("update is complete")
        navigate("/myAccount")
    }

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

};

export default EditUser;