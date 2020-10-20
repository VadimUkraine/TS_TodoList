import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>, 
  document.getElementById("app")
);