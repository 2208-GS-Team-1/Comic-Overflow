import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addBookToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
  },
});

export const { setCart, clearCart, addBookToCart } = cartSlice.actions;
export default cartSlice.reducer;
