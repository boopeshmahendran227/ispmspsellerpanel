import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  UPDATE_QUOTE_SUCCESS,
  REJECT_QUOTE_SUCCESS,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_VALUE_SUCCESS,
  UPDATE_CREDITS_SUCCESS,
  ADD_SKU_SUCCESS,
  UPDATE_SKU_SUCCESS,
  UPDATE_TIER_PRICE_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_ALL_PRODUCTS_STATUS_SUCCESS,
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

function* refreshProduct() {
  while (true) {
    yield take([
      ADD_SKU_SUCCESS,
      UPDATE_SKU_SUCCESS,
      UPDATE_TIER_PRICE_SUCCESS,
      UPDATE_ALL_PRODUCTS_STATUS_SUCCESS,
    ]);
    yield all(
      cache
        .keys()
        .filter((key) => key.startsWith("/product/seller"))
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

function* refreshSettings() {
  while (true) {
    yield take(UPDATE_SETTINGS_SUCCESS);
    yield call(mutate, `/seller/marketplaceconfig`);
  }
}

export default function* () {
  yield all([
    refreshOrder(),
    refreshQuote(),
    refreshAttributes(),
    refreshInvoice(),
    refreshProduct(),
    refreshSettings(),
  ]);
}
