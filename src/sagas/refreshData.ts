import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  UPDATE_QUOTE_SUCCESS,
  REJECT_QUOTE_SUCCESS,
  ADD_ATTRIBUTE_SUCCESS,
} from "../constants/ActionTypes";
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

function* refreshQuote() {
  while (true) {
    yield take([UPDATE_QUOTE_SUCCESS, REJECT_QUOTE_SUCCESS]);
    yield call(mutate, `/quote`);
  }
}

function* refreshAttributes() {
  while (true) {
    yield take([ADD_ATTRIBUTE_SUCCESS]);
    yield call(mutate, `/attribute`);
  }
}

export default function* () {
  yield all([refreshOrder(), refreshQuote(), refreshAttributes()]);
}
