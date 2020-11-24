import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ducks";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

// axios.interceptors.response.use(
//   function (response) {
//     console.log("axios response", response);
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
