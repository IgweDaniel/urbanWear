import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ducks";
import { Provider } from "react-redux";
import axios from "axios";
import { logout } from "./ducks/auth";

const store = configureStore({
  reducer: rootReducer,
});

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error.response);
    const invalidToken =
      error.response.statusText === "Unauthorized" &&
      error.response.data.code === "token_not_valid";

    const refresh = localStorage.getItem("refresh");
    const originalRequest = error.config;

    if (invalidToken && refresh) {
      const instance = axios.create();
      try {
        const { data } = await instance.post("/jwt/refresh/", { refresh });
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axios(originalRequest);
      } catch (error) {
        store.dispatch(logout());
        localStorage.removeItem("refresh");
      }
    } else {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token && !config.url.includes("product")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
