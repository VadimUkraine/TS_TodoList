import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import configureStore from "./store";

const store = configureStore();

const renderComponent = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
);

describe("App", () => {
  it("check render Todo root component in App", () => {
    const { getByTestId } = renderComponent();
    const todoRootComponent = getByTestId("todo-root-component");
    expect(todoRootComponent).toBeDefined();
  });
});
