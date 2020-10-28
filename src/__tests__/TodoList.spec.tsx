import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import TodoList from "../pages/Todo/TodoList";
import configureStore from "../store";

const mockStore = {
  todo: {
    list: ["buy milk", "buy water"],
  },
};

const store = configureStore(mockStore);

const renderComponent = () => render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
);

describe("TodoList", () => {
  test("check render the list of todo items", async () => {
    const { getByTestId } = renderComponent();
    const todoListComponent = getByTestId("todo-list-component");
    if (todoListComponent) {
      const items = await screen.findAllByRole("listitem");
      expect(items).toHaveLength(2);
    }
  });
});
