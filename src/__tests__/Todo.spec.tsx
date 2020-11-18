import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../components/Todo';
import configureStore from '../redux/store';
import TodoService from '../redux/api';

const store = configureStore();
jest.mock('../redux/api/service.ts', () => ({ getList: jest.fn() }));

beforeEach(() => render(
  <Provider store={store}>
    <Todo/>
  </Provider>,
));

afterEach(cleanup);

test('it renders component', () => {
  expect(screen.getByRole('textbox', { name: 'todo-form-input' })).toBeInTheDocument();
});

test('it checks request to get items list from server', () => {
  const { getList } = TodoService;
  expect(getList).toBeCalled();
});

test('it renders correctly todo', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Todo/>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
