import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../store/userSlice';


const AdminUserView = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const user = useSelector((state) => state.user.user)
    const [loading, setLoading] = useState(false);

    const userHandler = async () => {
        try {
            const user = await axios.get(`/api/users/${id}`) 
            dispatch(setUser(user.data));
            setLoading(true);
            console.log(user.data);
            
        } catch (error) {
            console.log(error)
        }
       
    }

    useEffect(()=>{
        userHandler();
    }, )

    if(!loading){ return (<div>Oops! Something went wrong!</div>)}

    return (
        <div>
            <h1>{user.firstName}</h1>
        </div>
    );
};

export default AdminUserView;