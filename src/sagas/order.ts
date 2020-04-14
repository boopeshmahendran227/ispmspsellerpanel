import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";

function* getOrders() {
  try {
    const data = yield call(api, "/order", {
      params: {
        sellerId: "1",
      },
    });
    yield put({ type: GET_ORDERS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_ORDERS_FAILURE });
  }
}

function* changeOrderItemStatus(action) {
  try {
    yield call(api, "/order/item", {
      method: "PUT",
      data: {
        orderItemId: action.orderItemId,
        orderItemStatus: action.orderItemStatus,
      },
    });
    yield put({
      type: CHANGE_ORDER_ITEM_STATUS_SUCCESS,
      orderId: action.orderId,
    });
  } catch (err) {
    yield put({ type: CHANGE_ORDER_ITEM_STATUS_FAILURE });
  }
}

function* watchGetOrders() {
  yield takeEvery(GET_ORDERS_REQUEST, getOrders);
}

function* watchChangeOrderItemStatus() {
  yield takeEvery(CHANGE_ORDER_ITEM_STATUS_REQUEST, changeOrderItemStatus);
}

export default function* () {
  yield all([watchGetOrders(), watchChangeOrderItemStatus()]);
}
