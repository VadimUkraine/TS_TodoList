import { all } from "redux-saga/effects";
import { todoSagaWatcher } from "./todo";

export default function* rootSaga() {
  yield all([todoSagaWatcher()]);
}
