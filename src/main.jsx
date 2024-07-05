import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Router from "./router";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
//import './index.css'
import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover    
     />    
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
