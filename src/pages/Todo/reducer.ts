import { IActions } from "./actions";
import * as c from "./constants";


const initialState = {
  list: [] as string[],
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
        list: state.list.filter((todo) => todo !== action.payload.todo),
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
