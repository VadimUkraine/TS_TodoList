import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "../pages/Todo";
import configureStore from "../store";

const store = configureStore();

const renderComponent = () => render(
  <Provider store={store}>
    <Todo/>
  </Provider>,
);

describe("Todo", () => {
  test("check render children of Todo root component and execute the whole logic in one pass", () => {
    const { getByTestId, getByLabelText } = renderComponent();
    const todoForm = getByTestId("todo-form");
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
    const todoFormAddButton = getByTestId("todo-form-add-button");
    const todoListComponent = getByTestId("todo-list-component");
    const isRenderAllChildren = todoForm && todoFormInput && todoFormAddButton && todoListComponent;

    if (isRenderAllChildren) {
      fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
      expect(todoFormInput.value).toBe("buy milk");
      fireEvent.click(todoFormAddButton);
      expect(todoFormInput.value).toBe("");
      const todoListItem = todoListComponent.querySelector("li") as HTMLLIElement;
      expect(todoListItem.textContent).toBe("buy milk");
      const listItemDeleteBtn = screen.getByTestId("todo-item-delete-btn") as HTMLButtonElement;
      fireEvent.click(listItemDeleteBtn);
      expect(todoListComponent.querySelector("li")).toBeNull();
    }
  });
});
