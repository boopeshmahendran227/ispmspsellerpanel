import { createStore, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import reasonMiddleware from "./middlewares/reason";

const composeEnhancers = composeWithDevTools({});

export function initializeStore(initialState = {}, { isServer, req = null }) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [reasonMiddleware, sagaMiddleware];
  const store: any = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
}
