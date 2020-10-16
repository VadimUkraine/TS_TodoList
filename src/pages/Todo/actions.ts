import {
  GET_TODO_LIST_ITEMS_REQUEST
} from './constants';

import { IItem } from './interfaces';

export function getTodoListRequest() {
  return {
    type: GET_TODO_LIST_ITEMS_REQUEST,
  };
}



export type IActions =
  | ReturnType<typeof getTodoListRequest>;
