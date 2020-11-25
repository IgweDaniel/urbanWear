import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as Api from "../api";
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    const { data, error } = await Api.fetchCart();
    if (error) {
      console.log(error);
      rejectWithValue("error");
    }
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    qty: 0,
  },
  reducers: {
    addItem(state, action) {
      const { product, size, quantity } = action.payload;
      state.items.push({ product, size, quantity });
      state.qty += quantity;
      state.total += quantity * product.final_price;
    },
    removeItem(state, action) {
      // eslint-disable-next-line
      const { id } = action.payload;
    },
    clearCart(state, action) {
      state.items = [];
      state.qty = 0;
      state.total = 0;
    },
    updateCart(state, action) {
      const { items, total, quantity } = action.payload;

      state.items = items;
      state.total = total;
      state.qty = quantity;
    },
  },

  extraReducers: {
    [fetchUserCart.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.items = payload.items;
      state.total = payload.total;
      state.qty = payload.quantity;
    },
  },
});

export const addCartItem = (size, productId, quantity = 1) => async (
  dispatch
) => {
  const { data, error } = await Api.addToCart(size, productId, quantity);
  if (error) {
    console.log(error);
  }
  dispatch(updateCart(data));
};

export const { addItem, removeItem, clearCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
