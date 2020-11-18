import {
  call, select, put, takeLatest,
} from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid';
import {
  getTodoListSuccess,
  addTodoRequest,
  deleteTodoRequest,
  changeTodoRequest,
} from "../actions/todo";
import {
  GET_TODO_LIST_ITEMS_REQUEST,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  CHANGE_TODO_REQUEST,
} from "../constants/todo";
import setDateTimeToString from "../utils";
import { Todo } from '../../types';
import TodoService from '../api';

export const getTodoListSaga = function* () {
  try {

    const list = yield call(TodoService.getList);

    if (list) {
      yield put(getTodoListSuccess(list));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const addTodoSaga = function* (action: ReturnType<typeof addTodoRequest>) {
  try {

    if (action.payload.todo.trim().length) {
      const newTodo = {
        id: uuidv4(),
        text: action.payload.todo.trim(),
        date: setDateTimeToString(),
      };
      const list = yield call(TodoService.addTodo, newTodo);
      yield put(getTodoListSuccess(list));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const deleteTodoSaga = function* (action: ReturnType<typeof deleteTodoRequest>) {
  try {

    if (action.payload.id) {
      const list = yield call(TodoService.deleteTodo, action.payload.id);
      yield put(getTodoListSuccess(list));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const changeTodoSaga = function* (action: ReturnType<typeof changeTodoRequest>) {
  try {

    const list = yield select((store) => store.todo.list);
    const changedTodo = list.find((todo: Todo) => todo.id === action.payload.id);

    if (changedTodo) {
      changedTodo.text = action.payload.text;
      changedTodo.date = setDateTimeToString();
      const updatedList = yield call(TodoService.changeTodo, changedTodo);
      yield put(getTodoListSuccess(updatedList));
    }

  } catch (err) {
    console.warn(err);
  }
};

export function* todoSagaWatcher() {
  yield takeLatest(GET_TODO_LIST_ITEMS_REQUEST, getTodoListSaga);
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
  yield takeLatest(CHANGE_TODO_REQUEST, changeTodoSaga);
}
