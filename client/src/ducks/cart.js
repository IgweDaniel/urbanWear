import { createSlice } from "@reduxjs/toolkit";
import { cart } from "../data";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [...cart],
    total: cart.reduce(
      (acc, item) => item.quantity * item.product.final_price + acc,
      0
    ),
    qty: cart.length,
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
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
