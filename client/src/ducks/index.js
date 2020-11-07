import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import cart from "./cart";

export default combineReducers({
  auth,
  cart,
});
