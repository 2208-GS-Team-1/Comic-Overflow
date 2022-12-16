/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';

const AdminUserEdit = ({fetchedUser, userHandler }) => {

    const [firstName , setFirstname] = useState(`${fetchedUser.firstName}`)
    const [lastName, setLastName] = useState(`${fetchedUser.lastName}`)
    const [address, setAddress] = useState(`${fetchedUser.address}`)
    const [birthday, setBirthday] = useState(`${fetchedUser.birthday}`)
    const [email, setEmail] = useState(`${fetchedUser.email}`)
    const [phoneNumber, setPhoneNumber] = useState(`${fetchedUser.phoneNumber}`)

    const firstNameHandler = (event) => {
        setFirstname(event.target.value)
    }
    const lastNameHandler = (event) => {
        setLastName(event.target.value)
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
    }
    const birthdayHandler = (event) =>{
        setBirthday(event.target.value)
    }
    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const phoneNumberHandler = (event) => {
        setPhoneNumber(event.target.value)
    }

    const updateHandler = async (event) =>{
        event.preventDefault();
        const updatedData = {address, email, phoneNumber, firstName, lastName, birthday}
        await axios.put(`/api/users/${fetchedUser.id}`, updatedData)
        userHandler();
    }

    return (
        <div className='formBase'>
            <div className='adminformDetail'>
                <form onSubmit={updateHandler}>
                    <h1>EDIT</h1>
                    <div className='formInput'>
                        <p className='adminEditP'>First Name:</p>
                        <input className='adminEditInput'
                        value={firstName}
                        onChange={firstNameHandler} />
                        <p className='adminEditP'>Last Name:</p>
                        <input className='adminEditInput'
                        value={lastName}
                        onChange={lastNameHandler} />
                        <p className='adminEditP'>Address:</p>
                        <input className='adminEditInput'
                        value={address}
                        onChange={addressHandler} />
                        <p className='adminEditP'>Birthday:</p>
                        <input className='adminEditInput'
                        value={birthday}
                        onChange={birthdayHandler} />
                        <p className='adminEditP'>Email:</p>
                        <input className='adminEditInput'
                        value={email} 
                        onChange={emailHandler}/>
                        <p className='adminEditP'>Phone Number:</p>
                        <input className='adminEditInput'
                        value={phoneNumber}
                        onChange={phoneNumberHandler} />
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUserEdit;