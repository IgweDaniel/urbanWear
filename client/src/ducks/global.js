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
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.categories = payload;
    },
  },
});

// export const {  } = globalSlice.actions;

export default globalSlice.reducer;
