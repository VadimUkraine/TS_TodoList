import * as c from './constants';

export function getTodoListRequest() {
  return {
    type: c.GET_TODO_LIST_ITEMS_REQUEST,
  };
}

export function addTodoRequest(todo: string) {
  return {
    type: c.ADD_TODO_REQUEST,
    payload: { todo },
  };
}

export function addTodoSuccess(todo: string) {
  return {
    type: c.ADD_TODO_SUCCESS,
    payload: { todo },
  };
}

export function addTodoFailure() {
  return {
    type: c.ADD_TODO_FAILURE,
  };
}


export function deleteTodoRequest(todo: string) {
  return {
    type: c.DELETE_TODO_REQUEST,
    payload: { todo },
  };
}

export function deleteTodoSuccess(todo: string) {
  return {
    type: c.DELETE_TODO_SUCCESS,
    payload: { todo },
  };
}

export function deleteTodoFailure() {
  return {
    type: c.DELETE_TODO_FAILURE,
  };
}



export type IActions =
  | ReturnType<typeof getTodoListRequest>
  | ReturnType<typeof addTodoRequest>
  | ReturnType<typeof addTodoSuccess>
  | ReturnType<typeof addTodoFailure>
  | ReturnType<typeof deleteTodoRequest>
  | ReturnType<typeof deleteTodoSuccess>
  | ReturnType<typeof deleteTodoFailure>;
