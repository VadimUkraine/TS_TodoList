import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoListItem from "../components/TodoListItem";

const mockTodoItem = "buy milk";

const handleDelete = jest.fn();

const renderComponent = () => render(
  <TodoListItem todo={mockTodoItem} deleteTodo={handleDelete}/>,
);

describe("TodoListItem", () => {
  test("check render the todo item and fire delete event", () => {
    const { getByTestId } = renderComponent();
    const todoListItem = getByTestId("todo-list-item");
    if (todoListItem) {
      fireEvent.click(screen.getByTestId("todo-item-delete-btn"));
      expect(handleDelete).toHaveBeenCalledTimes(1);
    }
  });
});
