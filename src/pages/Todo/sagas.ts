import { select, put, takeLatest } from "redux-saga/effects";
import * as a from "./actions";
import * as c from "./constants";
import {saveTodoList, getTodoList} from "./utils";

export const getTodoListSaga = function* () {
  try {

    const list = getTodoList();

    if (list) {
      yield put(a.getTodoListSuccess(JSON.parse(list)));
    }

  } catch (err) {
    console.warn(err);
  }
};


export const addTodoSaga = function* (action: ReturnType<typeof a.addTodoRequest>) {
  try {

    if (action.payload.todo.trim().length) {
      const list = yield select(store => store.todo.list);
      yield put(a.addTodoSuccess(action.payload.todo.trim()));
      saveTodoList(JSON.stringify([...list, action.payload.todo]));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const deleteTodoSaga = function* (action: ReturnType<typeof a.deleteTodoRequest>) {
  try {

    if (action.payload.todo) {
      const list = yield select(store => store.todo.list);
      yield put(a.deleteTodoSuccess(action.payload.todo));
      saveTodoList(JSON.stringify(list.filter((todo: string) => todo !== action.payload.todo)));
    }

  } catch (err) {
    console.warn(err);
  }
};

export function* todoSagaWatcher() {  
  yield takeLatest(c.GET_TODO_LIST_ITEMS_REQUEST, getTodoListSaga);
  yield takeLatest(c.ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(c.DELETE_TODO_REQUEST, deleteTodoSaga);
}