import { call, put, takeLatest } from 'redux-saga/effects';
import { addTodoRequest, addTodoSuccess } from './actions';
import { ADD_TODO_REQUEST } from './constants';


export const addTodoSaga = function* (action: ReturnType<typeof addTodoRequest>) {
  try {

    if(action.payload.todo.trim().length){
      yield put(addTodoSuccess(action.payload.todo.trim()));
    }

  } catch (err) {
    console.log(err);
  }
};

export function* todoSagaWatcher() {
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
}