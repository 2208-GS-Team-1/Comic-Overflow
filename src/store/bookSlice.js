import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  selectedBook: {},
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { setBooks, setSelectedBook, addBook } = bookSlice.actions;
export default bookSlice.reducer;
