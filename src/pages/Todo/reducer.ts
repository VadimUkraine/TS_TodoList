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
    default:
      return state;
  }
}
