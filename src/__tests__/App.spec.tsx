import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../App';
import configureStore from '../redux/store';

const store = configureStore();

beforeEach(() => render(
  <Provider store={store}>
     <App />
  </Provider>,
));

afterEach(cleanup);

test('it renders component', () => {
  expect(screen.getByRole('button', { name: 'Add Todo' })).toBeInTheDocument();
});
