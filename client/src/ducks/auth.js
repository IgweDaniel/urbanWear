import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "daniel",
      email: "danielIgwe@gmail.com",
    },
    // eslint-disable-next-line
    user: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state, action) {
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
