import { select, put, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from 'uuid';
import * as a from "./actions";
import * as c from "./constants";
import { saveTodoList, getTodoList, setDateTimeToString } from "./utils";
import { ITodo } from './interfaces';

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
      const list = yield select((store) => store.todo.list);
      const newTodo = {
        id: uuidv4(),
        text: action.payload.todo.trim(),
        date: setDateTimeToString(),
      };
      yield put(a.addTodoSuccess(newTodo));
      saveTodoList(JSON.stringify([...list, newTodo]));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const deleteTodoSaga = function* (action: ReturnType<typeof a.deleteTodoRequest>) {
  try {

    if (action.payload.id) {
      const list = yield select((store) => store.todo.list);
      yield put(a.deleteTodoSuccess(action.payload.id));
      saveTodoList(JSON.stringify(list.filter((todo: ITodo) => todo.id !== action.payload.id)));
    }

  } catch (err) {
    console.warn(err);
  }
};

export const changeTodoSaga = function* (action: ReturnType<typeof a.changeTodoRequest>) {
  try {

    const list = yield select((store) => store.todo.list);
    const changedTodo = list.find((todo: ITodo) => todo.id === action.payload.id);

    if (changedTodo) {
      changedTodo.text = action.payload.text;
      changedTodo.date = setDateTimeToString();
      yield put(a.changeTodoSuccess(changedTodo));
      saveTodoList(JSON.stringify(list.map((todo: ITodo) => {
        if (todo.id === action.payload.id) {
          return changedTodo;
        }
        return todo;
      })));
    }

  } catch (err) {
    console.warn(err);
  }
};

export function* todoSagaWatcher() {
  yield takeLatest(c.GET_TODO_LIST_ITEMS_REQUEST, getTodoListSaga);
  yield takeLatest(c.ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(c.DELETE_TODO_REQUEST, deleteTodoSaga);
  yield takeLatest(c.CHANGE_TODO_REQUEST, changeTodoSaga);

}
