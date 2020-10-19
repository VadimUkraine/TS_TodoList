import { IActions } from './actions';
import * as c from './constants'


const initialState = {
  list: ['buy milk', 'drink water',] as string[],
};

export type IReduxState = typeof initialState;

export function todoReducer(state = initialState, action: IActions): IReduxState {
  switch (action.type) {
    case c.DELETE_TODO_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item !== action.payload.todo),
      };
    case c.ADD_TODO_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload.todo],
      };
    default:
      return state;
  }
}
