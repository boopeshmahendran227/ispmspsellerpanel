import QuoteSaga from "./quote";
import ProductSaga from "./product";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(QuoteSaga), fork(ProductSaga)]);
}
