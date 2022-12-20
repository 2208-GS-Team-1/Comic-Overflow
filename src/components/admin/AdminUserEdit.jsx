/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';


const AdminUserEdit = ({ fetchedUser, userHandler }) => {

    const [firstName , setFirstname] = useState(`${fetchedUser.firstName}`)
    const [lastName, setLastName] = useState(`${fetchedUser.lastName}`)
    const [address, setAddress] = useState(`${fetchedUser.address}`)
    const [birthday, setBirthday] = useState(`${fetchedUser.birthday}`)
    const [email, setEmail] = useState(`${fetchedUser.email}`)
    const [phoneNumber, setPhoneNumber] = useState(`${fetchedUser.phoneNumber}`)
   const [isDeactivated, setDeactivated] = useState(fetchedUser.isDeactivated);


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
    const deactivateHandler = (event) => {
        setDeactivated(event.target.value)
    }

    const updateHandler = async (event) =>{
        event.preventDefault();
        const updatedData = {address, email, phoneNumber, firstName, lastName, birthday, isDeactivated}
        await axios.put(`/api/users/${fetchedUser.id}`, updatedData)
        userHandler();
    }

    return (
        <div className='formBase'>
            <div className='adminformDetail'>
                <form onSubmit={updateHandler}>
                    <h1>EDIT INFO</h1>
                    <div className='formInput'>
                        <p className='adminEditP'>First Name:  
                        {firstName.length < 1 ? " This is a required field" : ""}</p>
                        <input className='adminEditInput'
                        value={firstName}
                        onChange={firstNameHandler} />
                        <p className='adminEditP'>Last Name: 
                        {lastName.length < 1 ? "this is a required field" : ""}</p>
                        <input className='adminEditInput'
                        value={lastName}
                        onChange={lastNameHandler} />
                        <p className='adminEditP'>Address:</p>
                        <input className='adminEditInput'
                        type="text"
                        value={fetchedUser.address ? address : ""}
                        onChange={addressHandler} />
                        <p className='adminEditP'>Birthday:</p>
                        <p className='adminEditP'>
                            <small>Please follow the format xxxx-xx-xx</small>
                        </p>
                        <input className='adminEditInput'
                        value={(birthday.length <= 4)? '0000-00-00': birthday}
                        onChange={birthdayHandler} />
                        <p className='adminEditP'>Email:</p>
                        <input className='adminEditInput'
                        value={email} 
                        onChange={emailHandler}/>
                        <p className='adminEditP'>Phone Number: <small>{(phoneNumber.length > 10 || phoneNumber.length < 10)? "Please enter 10 digit numbers": ""}</small></p>
                        <input className='adminEditInput'
                        type="number"
                        value={phoneNumber}
                        onChange={phoneNumberHandler} />
                        <p className='adminEditP'>Deactivation Status</p>
                        <p className='adminEditSmallP'><small>Enter True or False</small></p>
                        <input className='adminEditInput'
                        value={isDeactivated}
                        onChange={deactivateHandler}></input>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUserEdit;
