import { createSlice } from "@reduxjs/toolkit";
import * as Api from "../api";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
  },
  reducers: {
    login(state, action) {
      const { access, refresh } = action.payload;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      state.token = access;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const authenticateUser = (email, password) => async (dispatch) => {
  const { data, error } = await Api.LoginUser(email, password);

  if (error) {
    throw new Error(error.detail);
  }
  dispatch(login(data));
};

export const setUserData = (email, password) => async (dispatch) => {
  const { data, error } = await Api.getUser();
  if (error) {
    console.log(error);
    dispatch(logout());
  }
  dispatch(setUser(data));
};

export const { setUser, login, logout } = authSlice.actions;

export default authSlice.reducer;
