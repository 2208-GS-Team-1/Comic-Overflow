/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import { Alert } from "@mui/material";


const AdminUserEdit = ({ fetchedUser, userHandler }) => {

    const [firstName , setFirstname] = useState(`${fetchedUser.firstName}`)
    const [lastName, setLastName] = useState(`${fetchedUser.lastName}`)
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState(`${fetchedUser.birthday}`)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(`${fetchedUser.phoneNumber}`)
   const [isDeactivated, setDeactivated] = useState(fetchedUser.isDeactivated);
   const [errorMessage, setErrorMessage] = useState(false);


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
        try {
            event.preventDefault();
            const token = window.localStorage.getItem("token");
            const config = { headers: { authorization: "Bearer " + token } };
            const updatedData = {address, email, phoneNumber, firstName, lastName, birthday, isDeactivated}
            await axios.put(`/api/users/${fetchedUser.id}`, updatedData, config)
            userHandler();
            
        } catch (error) {
            setErrorMessage(true)
        }
    }

    return (
        <div className='formBase'>
            <div className='adminformDetail'>
                <form onSubmit={updateHandler}>
                    <h1>EDIT INFO</h1>
                    <div className='formInput'>
                        {/*first name input */}
                        <p className='adminEditP'>First Name:  
                        {firstName.length < 1 ? " This is a required field" : ""}</p>
                        <input className='adminEditInput'
                        placeholder={firstName}
                        onChange={firstNameHandler} />
                        {/*last name input */}
                        <p className='adminEditP'>Last Name: 
                        {lastName.length < 1 ? "this is a required field" : ""}</p>
                        <input className='adminEditInput'
                         placeholder={lastName}
                        onChange={lastNameHandler} />
                        {/*address input */}
                        <p className='adminEditP'>Address: <small>*Required</small></p>
                        <input className='adminEditInput'
                        type="text"
                         placeholder="Please re-enter your address"
                        onChange={addressHandler} />
                        {/*birthday input */}
                        <p className='adminEditP'>Birthday: <small>*Required</small></p>
                        <p className='adminEditP'>
                            <small>Please follow the format xxxx-xx-xx</small>
                        </p>
                        <input className='adminEditInput'
                        placeholder ="0000-00-00"
                        onChange={birthdayHandler} />
                        {/*email input */}
                        <p className='adminEditP'>Email: <small>*Required</small></p>
                        <input className='adminEditInput'
                        placeholder="Please re-enter your email"
                        onChange={emailHandler}/>
                        {/*phone number input */}
                        <p className='adminEditP'>Phone Number: <small>{(phoneNumber.length > 10 || phoneNumber.length < 10)? "Please enter 10 digit numbers": ""}</small></p>
                        <p className='adminEditP'>
                            <small>*Required</small>
                        </p>
                        <input className='adminEditInput'
                        type="number"
                        placeholder={phoneNumber}
                        onChange={phoneNumberHandler} />
                        {/*deactivation status input */}
                        <p className='adminEditP'>Deactivation Status</p>
                        <p className='adminEditSmallP'><small>Enter True or False</small></p>
                        <input className='adminEditInput'
                        value={isDeactivated}
                        onChange={deactivateHandler}></input>
                        <button type='submit'>Submit</button>
                    {errorMessage && (
                    <Alert severity="error" sx={{ marginTop: "5px" }}>
                        Please fill out all required fields
                    </Alert>
                    )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUserEdit;
