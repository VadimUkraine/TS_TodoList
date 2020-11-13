import { IActions } from "../actions/todo";
import { GET_TODO_LIST_ITEMS_SUCCESS } from "../constants/todo";
import { ITodo } from '../../types';

const initialState = {
  list: [] as ITodo[],
};

export type IReduxState = typeof initialState;

export function todoReducer(state = initialState, action: IActions): IReduxState {
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
