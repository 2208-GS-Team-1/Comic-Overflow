import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../../store/userSlice';
import Slider from './Slider.jsx';
import './homeStyle.css'

const Home = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    // Below codes been blocked out FOR NOW //

    // const logout = () => {
    //     window.localStorage.removeItem('token');
    //     dispatch(resetUser());
    // };

    return (
        <div>
            <h1>Home</h1>
            <div>
                <Slider />
                {/* <button onClick={logout}>Logout</button> */}
            </div>
        </div>
    );
};

export default Home;
