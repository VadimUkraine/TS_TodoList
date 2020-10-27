import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
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
    const todoRootComponent = getByTestId("todo-root-component");
    const todoForm = getByTestId("todo-form");
    const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
    const todoFormAddButton = getByTestId("todo-form-add-button");
    const todoListComponent = getByTestId("todo-list-component");
    const isRenderAllChildren = todoForm && todoFormInput && todoFormAddButton && todoListComponent;

    if (todoRootComponent) {
      expect(todoRootComponent).toBeDefined();
      if (isRenderAllChildren) {
        fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
        expect(todoFormInput.value).toBe("buy milk");
        fireEvent.click(todoFormAddButton);
        expect(todoFormInput.value).toBe("");
        const todoListItem = todoListComponent.querySelector('li') as HTMLLIElement;
        expect(todoListItem.textContent).toBe("buy milk");
      }

    } else {
      expect(todoRootComponent).not.toBeDefined();
    }
  });

  // it("render Todo List Form", () => {
  //   const { getByTestId } = renderComponent();
  //   const todoForm = getByTestId("todo-form");
  //   expect(todoForm).toBeDefined();
  // });

  // it("render Todo List Input", () => {
  //   const { getByLabelText } = renderComponent();
  //   const todoFormInput = getByLabelText("todo-form-input");
  //   expect(todoFormInput).toBeDefined();
  // });

  // it("render Todo Form Button", () => {
  //   const { getByTestId } = renderComponent();
  //   const todoFormAddButton = getByTestId("todo-form-add-button");
  //   expect(todoFormAddButton).toBeDefined();
  // });

  // it("try to input add task", () => {
  //   const { getByLabelText } = renderComponent();
  //   const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
  //   fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
  //   expect(todoFormInput.value).toBe("buy milk");
  // });

  // it("try to click add task button", () => {
  //   const { getByTestId, getByLabelText } = renderComponent();
  //   const todoFormAddButton = getByTestId("todo-form-add-button");
  //   const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
  //   fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
  //   fireEvent.click(todoFormAddButton);
  //   expect(todoFormInput.value).toBe("");
  // });

  // it("render Todo List component", () => {
  //   const { getByTestId } = renderComponent();
  //   const todoListComponent = getByTestId("todo-list-component");
  //   expect(todoListComponent).toBeDefined();
  // });

  // it("try to add new task in todo list component", () => {
  //   const { getByTestId, getByLabelText } = renderComponent();
  //   const todoFormAddButton = getByTestId("todo-form-add-button");
  //   const todoFormInput = getByLabelText("todo-form-input") as HTMLInputElement;
  //   fireEvent.change(todoFormInput, { target: { value: "buy milk" } });
  //   fireEvent.click(todoFormAddButton);
  //   expect(todoFormInput.value).toBe("");
  //   const todoListComponent = getByTestId("todo-list-component");
  //   const todoListItem = todoListComponent.querySelector('li') as HTMLLIElement;
  //   expect(todoListItem.textContent).toBe("buy milk");
  // });
});
