import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  APPROVE_CANCEL_ORDER_ITEM,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";
import OrderActions from "../actions/order";
import { OrderStatus } from "../types/order";

function* getOrders() {
  try {
    const data = yield call(api, "/order");
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
    yield put(
      OrderActions.changeOrderItemStatusSuccess(
        action.orderId,
        action.orderItemId
      )
    );
  } catch (err) {
    yield put(
      OrderActions.changeOrderItemStatusFailure(
        action.orderId,
        action.orderItemId
      )
    );
  }
}

function* approveCancelOrderItem(action) {
  yield put(
    OrderActions.changeOrderItemStatus(
      action.orderId,
      action.orderItemId,
      OrderStatus.CancelCompleted
    )
  );
}

function* rejectCancelOrderItem(action) {
  // yield put(
  //   OrderActions.changeOrderItemStatus(
  //     action.orderId,
  //     action.orderItemId,
  //     OrderStatus.CancelCompleted
  //   )
  // );
}

function* watchGetOrders() {
  yield takeEvery(GET_ORDERS_REQUEST, getOrders);
}

function* watchChangeOrderItemStatus() {
  yield takeEvery(CHANGE_ORDER_ITEM_STATUS_REQUEST, changeOrderItemStatus);
}

function* watchApproveCancelOrderitem() {
  yield takeEvery(APPROVE_CANCEL_ORDER_ITEM, approveCancelOrderItem);
}

function* watchRejectCancelOrderItem() {
  yield takeEvery(APPROVE_CANCEL_ORDER_ITEM, rejectCancelOrderItem);
}

export default function* () {
  yield all([
    watchGetOrders(),
    watchChangeOrderItemStatus(),
    watchApproveCancelOrderitem(),
    watchRejectCancelOrderItem(),
  ]);
}
