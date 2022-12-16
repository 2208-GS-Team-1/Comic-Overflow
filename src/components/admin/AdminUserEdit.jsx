/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const AdminUserEdit = ({fetchedUser}) => {

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

    return (
        <div className='formBase'>
            <div className='formDetail'>
                <form>
                    <h1>EDIT</h1>
                    <div className='formInput'>
                        <p>First Name:</p>
                        <input className='editInput'
                        value={firstName}
                        onChange={firstNameHandler} />
                        <p>Last Name:</p>
                        <input className='editInput'
                        value={fetchedUser.lastName} />
                        <p>Address:</p>
                        <input className='editInput'
                        value={fetchedUser.address} />
                        <p>Birthday:</p>
                        <input className='editInput'
                        value={fetchedUser.birthday} />
                        <p>Email:</p>
                        <input className='editInput'
                        value={fetchedUser.email} />
                        <p>Phone Number:</p>
                        <input className='editInput'
                        value={fetchedUser.phoneNumber} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUserEdit;