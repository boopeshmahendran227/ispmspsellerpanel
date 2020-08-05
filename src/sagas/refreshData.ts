import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  UPDATE_QUOTE_SUCCESS,
  REJECT_QUOTE_SUCCESS,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_VALUE_SUCCESS,
  UPDATE_CREDITS_SUCCESS,
} from "../constants/ActionTypes";
import { take, all, call } from "redux-saga/effects";
import { mutate, cache } from "swr";

function* refreshOrder() {
  while (true) {
    yield take([CHANGE_ORDER_ITEM_STATUS_SUCCESS]);
    yield all(
      cache
        .keys()
        .filter((key) => key.startsWith("/order"))
        .map((key) => call(mutate, key))
    );
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
    yield take([ADD_ATTRIBUTE_SUCCESS, ADD_ATTRIBUTE_VALUE_SUCCESS]);
    yield call(mutate, `/attribute`);
  }
}

function* refreshInvoice() {
  while (true) {
    yield take(UPDATE_CREDITS_SUCCESS);
    yield call(mutate, `/invoice`);
  }
}

export default function* () {
  yield all([
    refreshOrder(),
    refreshQuote(),
    refreshAttributes(),
    refreshInvoice(),
  ]);
}
