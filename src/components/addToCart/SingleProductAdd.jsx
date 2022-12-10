import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../store/cartSlice';

// eslint-disable-next-line react/prop-types
const SingleProductAdd = ({ bookQuantity }) => {
    const selectedBook = useSelector((state) => state.book.selectedBook);
    const { user } = useSelector(state => state.user);
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const userId = user.id
    const bookId = selectedBook.id
    
    const addToCart = async () => {
        try {
          if (!user.id) {
              alert("Please login to add to cart");
          } else {
            const existingItem = cart.find((cartItem) => cartItem.book.id === bookId);
            // If book quantity > 1 and the item already exists in our cart
              if(bookQuantity > 1 && existingItem){
                // if the items book stock is > the amount we already have + the amount want to add
                if(existingItem.book.stock >= (existingItem.quantity + Number(bookQuantity))) {  
                  await axios.put(`/api/cart/${existingItem.id}`, {
                      quantity: existingItem.quantity + Number(bookQuantity),
                  });
                  const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                  dispatch(setCart(updatedCart.data))
                } else {
                  // if the user tries to add more to their cart than the stock has, we max their cart to the stock amount
                  await axios.put(`/api/cart/${existingItem.id}`, {
                    quantity: existingItem.book.stock,
                })
                const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                dispatch(setCart(updatedCart.data))
                }
              } else if (existingItem && bookQuantity === 1){
                if(existingItem && existingItem.book.stock >= (existingItem.quantity + Number(bookQuantity))) {  
                  await axios.put(`/api/cart/${existingItem.id}`, {
                      quantity: existingItem.quantity + Number(bookQuantity),
                  });
                  const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                  dispatch(setCart(updatedCart.data))
                }
              } else if(!existingItem){
                const book = await axios.get(`/api/books/${bookId}`)
                const bookToAdd = book.data
                const numBookQuantity = Number(bookQuantity)
                if(numBookQuantity === 1 && bookToAdd.stock > numBookQuantity){
                  const body = { userId, bookId };
                  await axios.post("/api/cart", body);
                  const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                  dispatch(setCart(updatedCart.data))
                } else if (numBookQuantity <= bookToAdd.stock){
                    console.log(numBookQuantity, bookToAdd.stock)
                    const body = { userId, bookId, numBookQuantity };
                    await axios.post(`/api/cart/user/quantity`, body);
                    const updatedCart = await axios.get(`/api/cart/user/${user.id}`)
                    dispatch(setCart(updatedCart.data))
                } 
          }
        }
      } catch (error) {
          console.log(error)
      }
      }
    return (
        <div>
            <button 
            onClick={addToCart}
            name="cartButton">Add to Cart</button>
        </div>
    );
};

export default SingleProductAdd;