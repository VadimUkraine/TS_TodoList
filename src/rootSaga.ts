import { all } from "redux-saga/effects";
import { todoSagaWatcher } from "./pages/Todo/sagas";



export default function* rootSaga() {
  yield all([todoSagaWatcher()]);
}
