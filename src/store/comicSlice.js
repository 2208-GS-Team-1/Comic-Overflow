import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comics: [],
  selectedComic: {},
};

export const userSlice = createSlice({
  name: "comic",
  initialState,
  reducers: {},
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
