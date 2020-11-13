import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";
import rootSaga from "../sagas/rootSaga";

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
