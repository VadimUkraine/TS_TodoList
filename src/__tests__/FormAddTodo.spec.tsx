import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {
  render, fireEvent, screen, cleanup,
} from '@testing-library/react';
import FormAddTodo from '../components/Todo/FormAddTodo';
import configureStore from '../redux/store/configureStore';
import TodoService from '../redux/api';

const store = configureStore();
jest.mock('../redux/api/service.ts', () => ({ addTodo: jest.fn() }));

beforeEach(() => render(
  <Provider store={store}>
    <FormAddTodo />
  </Provider>,
));

afterEach(cleanup);

test('it renders component', () => {
  expect(screen.getByLabelText(/Write todo here/i)).toBeInTheDocument();
});

test('it renders input', () => {
  expect(screen.getByRole('textbox', { name: 'todo-form-input' })).toBeInTheDocument();
});

test('it renders button', () => {
  expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
});

test('it checkes adding todo', () => {
  const input = screen.getByLabelText(/Write todo here/i);
  fireEvent.change(input, { target: { value: 'buy water' } });
  expect(screen.getByDisplayValue('buy water')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));
  expect(screen.queryByDisplayValue('buy water')).toBeNull();
});

test('it checks request to server to add todo', () => {
  const { addTodo } = TodoService;
  const input = screen.getByLabelText(/Write todo here/i);
  fireEvent.change(input, { target: { value: 'buy water' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Todo' }));
  expect(addTodo).toBeCalled();
});

test('it renders correctly formAddTodo', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <FormAddTodo />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
