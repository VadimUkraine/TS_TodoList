import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {
  render, screen, cleanup,
} from '@testing-library/react';
import TodoList from '../components/Todo/TodoList';
import configureStore from '../redux/store';

const mockStore = {
  todo: {
    list: [
      {
        id: '1c0573e9-2e59-48c8-9b0b-ec5f63afbe0d',
        text: 'buy beer',
        date: '04.11.2020, 17:47',
      },
      {
        id: 'a1f80f52-1690-4c20-a74b-32ac420ece61',
        text: 'buy bread',
        date: '04.11.2020, 13:30',
      },
    ],
  },
};

const store = configureStore(mockStore);

beforeEach(() => render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
));

afterEach(cleanup);

test('it renders component', () => {
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('it renders correctly todoList', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
