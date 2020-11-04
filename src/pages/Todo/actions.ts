import * as c from "./constants";
import { ITodo } from "./interfaces";

export function getTodoListRequest() {
  return {
    type: c.GET_TODO_LIST_ITEMS_REQUEST,
  };
}

export function getTodoListSuccess(list: ITodo[]) {
  return {
    type: c.GET_TODO_LIST_ITEMS_SUCCESS,
    payload: { list },
  };
}

export function getTodoListFailure() {
  return {
    type: c.GET_TODO_LIST_ITEMS_FAILURE,
  };
}

export function addTodoRequest(todo: string) {
  return {
    type: c.ADD_TODO_REQUEST,
    payload: { todo },
  };
}

export function addTodoSuccess(todo: ITodo) {
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

export function deleteTodoRequest(id: string) {
  return {
    type: c.DELETE_TODO_REQUEST,
    payload: { id },
  };
}

export function deleteTodoSuccess(id: string) {
  return {
    type: c.DELETE_TODO_SUCCESS,
    payload: { id },
  };
}

export function deleteTodoFailure() {
  return {
    type: c.DELETE_TODO_FAILURE,
  };
}

export function changeTodoRequest(id: string, text: string) {
  return {
    type: c.CHANGE_TODO_REQUEST,
    payload: { id, text },
  };
}

export function changeTodoSuccess(changedTodo: ITodo) {
  return {
    type: c.CHANGE_TODO_SUCCESS,
    payload: { changedTodo },
  };
}

export function changeTodoFailure() {
  return {
    type: c.CHANGE_TODO_FAILURE,
  };
}

export type IActions =
  | ReturnType<typeof getTodoListRequest>
  | ReturnType<typeof getTodoListSuccess>
  | ReturnType<typeof getTodoListFailure>
  | ReturnType<typeof addTodoRequest>
  | ReturnType<typeof addTodoSuccess>
  | ReturnType<typeof addTodoFailure>
  | ReturnType<typeof deleteTodoRequest>
  | ReturnType<typeof deleteTodoSuccess>
  | ReturnType<typeof deleteTodoFailure>
  | ReturnType<typeof changeTodoRequest>
  | ReturnType<typeof changeTodoSuccess>
  | ReturnType<typeof changeTodoFailure>;
