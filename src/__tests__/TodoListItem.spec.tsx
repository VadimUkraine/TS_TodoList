import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoListItem from ".";

const mockTodoItem = "buy milk";

const handleDelete = jest.fn();

describe("TodoListItem", () => {
  test("check render the todo item and fire delete event", () => {
    render(
      <TodoListItem todo={mockTodoItem} deleteTodo={handleDelete}/>,
    );
    fireEvent.click(screen.getByTestId("todo-item-delete-btn"));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
