import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../store/userSlice';

//hey guys! 
//so this is supposed to be super simple but it's giving me some trouble
// data is coming up as empty
//jumping into voice chat room
// ROSE - OKKKKKK omg caps
const AdminUserView = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // const user = useSelector((state) => state.user.user)

    const userHandler = async () => {
        try {
            const user = await axios.get(`/api/users/${id}`) 
            // dispatch(setUser(data));
            console.log(user);
            
        } catch (error) {
            console.log(error)
        }
        console.log(id)
    }

    useEffect(()=>{
        if(!id){
            return 
        }
        userHandler();
    }, [id])

    return (
        <div>
            <h1>TEST</h1>
        </div>
    );
};

export default AdminUserView;