import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "states";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "states/api";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
