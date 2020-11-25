import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ducks";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response);
    const requiresLogin =
      error.response.statusText === "Unauthorized" &&
      error.response.data.code === "token_not_valid";
    const pathname = window.location.pathname;
    if (requiresLogin && pathname !== "/") {
      window.location.replace("/");
      console.log(window.location);
    }

    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
