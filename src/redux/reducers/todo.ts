import { Actions } from "../actions/todo";
import { GET_TODO_LIST_ITEMS_SUCCESS } from "../constants/todo";
import { Todo } from '../../types';

const initialState = {
  list: [] as Todo[],
};

export type IReduxState = typeof initialState;

export function todoReducer(state = initialState, action: Actions): IReduxState {
  switch (action.type) {
    case GET_TODO_LIST_ITEMS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
}
