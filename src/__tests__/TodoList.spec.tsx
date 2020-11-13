import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import TodoList from ".";
import configureStore from "../../../store";

const mockStore = {
  todo: {
    list: ["buy milk", "buy water"],
  },
};

const store = configureStore(mockStore);

describe("TodoList", () => {
  test("check render the list of todo items", async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
