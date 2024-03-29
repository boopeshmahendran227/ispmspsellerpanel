import { createStore, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import { MakeStoreOptions } from "next-redux-wrapper";

const composeEnhancers = composeWithDevTools({});

export function initializeStore(
  initialState = {},
  { isServer, req = undefined }: MakeStoreOptions
) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
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
