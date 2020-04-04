import { CHANGE_ORDER_ITEM_STATUS_REQUEST } from "../constants/ActionTypes";
import { take, all, put } from "redux-saga/effects";
import OrderActions from "../actions/order";

function* refreshOrder() {
  while (true) {
    yield take([CHANGE_ORDER_ITEM_STATUS_REQUEST]);
    yield put(OrderActions.getCurrentOrder());
  }
}

export default function* () {
  yield all([refreshOrder()]);
}
