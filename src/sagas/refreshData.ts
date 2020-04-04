import { CHANGE_ORDER_ITEM_STATUS_SUCCESS } from "../constants/ActionTypes";
import { take, all, put } from "redux-saga/effects";
import OrderActions from "../actions/order";

function* refreshOrder() {
  while (true) {
    yield take([CHANGE_ORDER_ITEM_STATUS_SUCCESS]);
    yield put(OrderActions.getCurrentOrder());
    yield put(OrderActions.getOrders());
  }
}

export default function* () {
  yield all([refreshOrder()]);
}
