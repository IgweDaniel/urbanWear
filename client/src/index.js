import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ducks";
import { Provider } from "react-redux";
import axios from "axios";
import { logout } from "./ducks/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CSSPlugin, gsap } from "gsap";

gsap.registerPlugin(CSSPlugin);

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "http://localhost:8000/api";
} else {
  axios.defaults.baseURL = "/api";
}
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // console.log(error.response.data);
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

const stripePromise = loadStripe("pk_test_PLv72kSx3E3Mo1UY70wgnS6U00uPnDDisq");
ReactDOM.render(
  <React.StrictMode>
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800&display=swap",
          },
        ],
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
