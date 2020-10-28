import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import FormAddTodo from "../pages/Todo/FormAddTodo";
import configureStore from "../store";

const store = configureStore();

const renderComponent = () => render(
  <Provider store={store}>
    <FormAddTodo />
  </Provider>,
);

describe("FormAddTodo", () => {
  test("check render children of FormAddTodo component and execute the logic of adding todo", () => {
    const { getByTestId, getByLabelText } = renderComponent();
    const todoForm = getByTestId("todo-form");
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
    const todoFormAddButton = getByTestId("todo-form-add-button");
    const isRenderAllChildren = todoForm && todoFormInput && todoFormAddButton;

    if (isRenderAllChildren) {
      fireEvent.change(todoFormInput, { target: { value: "buy water" } });
      expect(todoFormInput.value).toBe("buy water");
      fireEvent.click(todoFormAddButton);
      expect(todoFormInput.value).toBe("");
    }
  });
});
