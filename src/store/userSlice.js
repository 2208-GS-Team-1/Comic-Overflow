import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  selectedUser: {},
  allUsers: [],
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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setUser, resetUser, setSelectedUser, setAllUsers } =
  userSlice.actions;
export default userSlice.reducer;
