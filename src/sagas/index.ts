import QuoteSaga from "./quote";
import ProductSaga from "./product";
import OrderSaga from "./order";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(QuoteSaga), fork(ProductSaga), fork(OrderSaga)]);
}
