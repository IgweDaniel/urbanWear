import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Api from "../api";

export const fetchCategories = createAsyncThunk(
  "cart/fetchCategories",
  async (_, { rejectWithValue }) => {
    const { data, error } = await Api.fetchProductsCategories();
    if (error) {
      console.log(error);
      rejectWithValue("error");
    }
    return data;
  }
);
const globalSlice = createSlice({
  name: "global",
  initialState: {
    categories: [],
    notifications: [],
  },
  reducers: {
    createNotification(state, { payload }) {
      const id = `${new Date()} ${state.notifications.length + 1}`;
      state.notifications.unshift({ ...payload, id });
    },

    deleteNotification(state, { payload }) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== payload.id
      );
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.categories = payload;
    },
  },
});

export const { createNotification, deleteNotification } = globalSlice.actions;

export default globalSlice.reducer;
