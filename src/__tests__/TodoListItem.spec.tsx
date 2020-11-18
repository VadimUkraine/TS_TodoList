import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import TodoListItem from '../components/Todo/TodoList/TodoListItem';

const mockTodoItem = {
  id: 'a52dfc2d-0d70-49b9-b58f-21b8ea2408d4',
  text: 'buy milk',
  date: '03.11.2020, 20:38',
};
const handleDelete = jest.fn();
const handleChangeTodo = jest.fn();
const handleSetEditId = jest.fn();

beforeEach(() => render(
  <TodoListItem
    todo={mockTodoItem}
    deleteTodo={handleDelete}
    editID={mockTodoItem.id}
    setEditId={handleSetEditId}
    changeTodo={handleChangeTodo}
  />,
));

afterEach(cleanup);

test('it renders component', () => {
  expect(screen.getByRole('textbox', { name: 'todo-item-edit-input' })).toBeInTheDocument();
});

test('it renders delete button', () => {
  expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
});

test('it renders edit button', () => {
  expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
});

test('it checks delete item from DOM', () => {
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(screen.queryByText(/buy milk/i)).toBeNull();
});

test('it checks click button edit', () => {
  fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
  expect(screen.getByDisplayValue('buy milk')).toBeInTheDocument();
});

test('it checks click delete button', () => {
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  expect(handleDelete).toBeCalled();
});

test('it renders correctly todoListItem', () => {
  const tree = renderer
    .create(<TodoListItem
      todo={mockTodoItem}
      deleteTodo={handleDelete}
      editID={mockTodoItem.id}
      setEditId={handleSetEditId}
      changeTodo={handleChangeTodo}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
