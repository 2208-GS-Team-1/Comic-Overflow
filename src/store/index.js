import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookReducer from "./bookSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export default store;
