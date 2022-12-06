import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../../store/userSlice';

const UserPage = () => {
    //user can click on the account link to enter this page
    // here, user will be able to update their info
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.user.selectedUser)
    const user = useSelector((state) => state.user.user)
    const id = user.id
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const userHandler = async () =>{
        const userData = await axios.get(`api/users/${id} `)
        dispatch(setSelectedUser(userData.data))
        setLoading(true);
    }

    const navigator = () => {
        navigate("/myAccount/edit")
    }

    useEffect(()=>{
        userHandler();
    }, [])


    if(loading){
        return (
            <div>
                <h1>Account Detail</h1>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Address: {user.address}</p>
                <p>Birthday: {user.birthday}</p>
                <p>Email: {user.email}</p>
                <p>Phone Number: {user.phoneNumber}</p>
                <button onClick={navigator}>Edit</button>
            </div>
        );
    }
};

export default UserPage;