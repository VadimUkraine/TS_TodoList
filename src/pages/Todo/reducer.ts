import { IActions } from "./actions";
import * as c from "./constants";
import { ITodo } from './interfaces';

const initialState = {
  list: [] as ITodo[],
};

export type IReduxState = typeof initialState;

export function todoReducer(state = initialState, action: IActions): IReduxState {
  switch (action.type) {
    case c.GET_TODO_LIST_ITEMS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
      };
    case c.DELETE_TODO_SUCCESS:
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload.id),
      };
    case c.ADD_TODO_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload.todo],
      };
    case c.CHANGE_TODO_SUCCESS:
      return {
        ...state,
        list: state.list.map((todo: ITodo) => {
          if (todo.id === action.payload.changedTodo.id) {
            return action.payload.changedTodo;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}
