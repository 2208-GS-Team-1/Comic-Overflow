import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  selectedUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {};
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUser, resetUser, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
