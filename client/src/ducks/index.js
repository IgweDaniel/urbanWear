import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import cart from "./cart";
import global from "./global";

export default combineReducers({
  auth,
  cart,
  global,
});
