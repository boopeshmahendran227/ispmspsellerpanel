import { CHANGE_ORDER_ITEM_STATUS_SUCCESS } from "../constants/ActionTypes";
import { take, all, put, call } from "redux-saga/effects";
import OrderActions from "../actions/order";
import { mutate } from "swr";

function* refreshOrder() {
  while (true) {
    const action = yield take([CHANGE_ORDER_ITEM_STATUS_SUCCESS]);
    yield call(mutate, `/order/${action.orderId}`);
    yield put(OrderActions.getOrders());
  }
}

export default function* () {
  yield all([refreshOrder()]);
}
