import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    cart: cartReducer,
  },
});

export default store;
