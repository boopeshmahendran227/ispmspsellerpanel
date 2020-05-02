import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  APPROVE_CANCEL_ORDER_ITEM,
  REJECT_CANCEL_ORDER_ITEM,
  APPROVE_RETURN_ORDER_ITEM,
  REJECT_RETURN_ORDER_ITEM,
  MARK_AS_SHIPPING_COMPLETE,
  MARK_AS_SHIPPING,
  CANCEL_ORDER_ITEM,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put, take } from "redux-saga/effects";
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
        orderItemIds: [action.orderItemId],
        ...(action.orderItemStatus === OrderStatus.CancelRequested && {
          cancelReason: action.reason,
        }),
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

function* watchGetOrders() {
  yield takeEvery(GET_ORDERS_REQUEST, getOrders);
}

function* watchChangeOrderItemStatus() {
  yield takeEvery(CHANGE_ORDER_ITEM_STATUS_REQUEST, changeOrderItemStatus);
}

const status = {
  [APPROVE_CANCEL_ORDER_ITEM]: OrderStatus.CancelCompleted,
  [REJECT_CANCEL_ORDER_ITEM]: OrderStatus.CancelRejected,
  [APPROVE_RETURN_ORDER_ITEM]: OrderStatus.ReturnCompleted,
  [REJECT_RETURN_ORDER_ITEM]: OrderStatus.ReturnRejected,
  [MARK_AS_SHIPPING]: OrderStatus.Shipping,
  [MARK_AS_SHIPPING_COMPLETE]: OrderStatus.ShippingCompleted,
  [CANCEL_ORDER_ITEM]: OrderStatus.CancelRequested,
};

function* watchStatusChange() {
  while (true) {
    const action = yield take(Object.keys(status));
    yield put(
      OrderActions.changeOrderItemStatus(
        action.orderId,
        action.orderItemId,
        status[action.type],
        action.reason
      )
    );
  }
}

export default function* () {
  yield all([
    watchGetOrders(),
    watchChangeOrderItemStatus(),
    watchStatusChange(),
  ]);
}
