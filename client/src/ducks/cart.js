import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as Api from "../api";
import { createNotification } from "./global";
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
    coupon: null,
    discountAmount: 0,
  },
  reducers: {
    addItem(state, action) {
      const { product, size, quantity } = action.payload;
      state.items.push({ product, size, quantity });
      state.qty += quantity;
      state.total += quantity * product.final_price;
    },

    clearCart(state, action) {
      state.items = [];
      state.qty = 0;
      state.total = 0;
    },
    updateCart(state, action) {
      if (!action.payload) return;
      const { items, total, quantity, coupon } = action.payload;

      state.items = items;
      state.total = total;
      state.qty = quantity;
      state.coupon = coupon.code;
      state.discountAmount = coupon.amount;
    },
  },

  extraReducers: {
    [fetchUserCart.fulfilled]: (state, { payload }) => {
      if (!payload) return;
      state.items = payload.items;
      state.total = payload.total;
      state.qty = payload.quantity;
      state.coupon = payload.coupon.code;
      state.discountAmount = payload.coupon.amount;
    },
  },
});

export const addCartItem = (size, productId, name, quantity = 1) => async (
  dispatch
) => {
  const { data, error } = await Api.addToCart(size, productId, quantity);
  if (error) {
    console.log(error);
    dispatch(
      createNotification({
        type: "error",
        message: `Error updating cart`,
      })
    );
    return;
  }
  dispatch(updateCart(data));
  dispatch(
    createNotification({
      type: "success",
      message: `Product "${name}" added to cart`,
    })
  );
};

export const { addItem, clearCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;
