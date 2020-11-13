import {
  GET_TODO_LIST_ITEMS_REQUEST,
  GET_TODO_LIST_ITEMS_SUCCESS,
  GET_TODO_LIST_ITEMS_FAILURE,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  CHANGE_TODO_REQUEST,
} from "../constants/todo";
import { ITodo } from "../../types";

export function getTodoListRequest() {
  return {
    type: GET_TODO_LIST_ITEMS_REQUEST,
  };
}

export function getTodoListSuccess(list: ITodo[]) {
  return {
    type: GET_TODO_LIST_ITEMS_SUCCESS,
    payload: { list },
  };
}

export function getTodoListFailure() {
  return {
    type: GET_TODO_LIST_ITEMS_FAILURE,
  };
}

export function addTodoRequest(todo: string) {
  return {
    type: ADD_TODO_REQUEST,
    payload: { todo },
  };
}

export function deleteTodoRequest(id: string) {
  return {
    type: DELETE_TODO_REQUEST,
    payload: { id },
  };
}

export function changeTodoRequest(id: string, text: string) {
  return {
    type: CHANGE_TODO_REQUEST,
    payload: { id, text },
  };
}

export type IActions =
  | ReturnType<typeof getTodoListRequest>
  | ReturnType<typeof getTodoListSuccess>
  | ReturnType<typeof getTodoListFailure>
  | ReturnType<typeof addTodoRequest>
  | ReturnType<typeof deleteTodoRequest>
  | ReturnType<typeof changeTodoRequest>;
