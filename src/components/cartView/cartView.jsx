import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/cartSlice';
import './cartViewStyles.css'
const CartView = () => {
    const { cart } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const getUsersCart = async () => {
        if(!user.id){
            console.log(`please make an account`)
        } else {
            setLoading(true)
            const cart = await axios.get(`/api/cart/user/${user.id}`)
            dispatch(setCart(cart.data))
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUsersCart();
    },[user])
    if(loading) {
        return "Loading..."
    } else if (!user.id){
        return "please make an account"
    } else
    return (
        <div
        className='cart'
        >
            <div
            className='usersCart'
            >
            {user.username}'s Cart
            <ul>
            {
                cart.map((cartItem)=>{
                    return (
                        <li
                        key={cartItem.id}
                        >
                            {cartItem.book.title}
                        </li>
                    )
                })
            }
            </ul>
            </div>
        </div>
    );
};

export default CartView;