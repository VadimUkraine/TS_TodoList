import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import App from "./App";
import configureStore from "./redux/store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("app"),
);

if ('serviceWorker' in navigator) {
  runtime.register();
}
