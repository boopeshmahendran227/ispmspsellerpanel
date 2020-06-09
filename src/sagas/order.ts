import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  APPROVE_CANCEL_ORDER_ITEM_REQUEST,
  REJECT_CANCEL_ORDER_ITEM_REQUEST,
  APPROVE_RETURN_ORDER_ITEM_REQUEST,
  REJECT_RETURN_ORDER_ITEM_REQUEST,
  MARK_AS_SHIPPING_COMPLETE_REQUEST,
  MARK_AS_SHIPPING_REQUEST,
  CANCEL_ORDER_ITEM_REQUEST,
  SET_ORDER_CURRENT_PAGE_NUMBER,
  MARK_AS_PROCESSING,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put, take, select } from "redux-saga/effects";
import api from "../api";
import OrderActions from "../actions/order";
import { OrderStatus } from "../types/order";
import { getCurrentPageNumber } from "../selectors/order";

function* getOrders() {
  try {
    const pageNumber = yield select(getCurrentPageNumber);
    const data = yield call(api, `/order?pageNumber=${pageNumber}`);
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
        ...(action.deliveryCode && {
          deliveryCode: action.deliveryCode,
        }),
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

function* watchSetOrderCurrentPageNumber() {
  while (true) {
    yield take(SET_ORDER_CURRENT_PAGE_NUMBER);
    yield put({ type: GET_ORDERS_REQUEST });
  }
}

function* watchChangeOrderItemStatus() {
  yield takeEvery(CHANGE_ORDER_ITEM_STATUS_REQUEST, changeOrderItemStatus);
}

const status = {
  [APPROVE_CANCEL_ORDER_ITEM_REQUEST]: OrderStatus.CancelCompleted,
  [REJECT_CANCEL_ORDER_ITEM_REQUEST]: OrderStatus.CancelRejected,
  [APPROVE_RETURN_ORDER_ITEM_REQUEST]: OrderStatus.ReturnCompleted,
  [REJECT_RETURN_ORDER_ITEM_REQUEST]: OrderStatus.ReturnRejected,
  [MARK_AS_SHIPPING_REQUEST]: OrderStatus.Shipping,
  [MARK_AS_SHIPPING_COMPLETE_REQUEST]: OrderStatus.ShippingCompleted,
  [CANCEL_ORDER_ITEM_REQUEST]: OrderStatus.CancelRequested,
  [MARK_AS_PROCESSING]: OrderStatus.SellerProcessing,
};

function* watchStatusChange() {
  while (true) {
    const action = yield take(Object.keys(status));
    yield put(
      OrderActions.changeOrderItemStatus(
        action.orderId,
        action.orderItemId,
        status[action.type],
        action.reason,
        action.deliveryCode
      )
    );
  }
}

export default function* () {
  yield all([
    watchGetOrders(),
    watchChangeOrderItemStatus(),
    watchStatusChange(),
    watchSetOrderCurrentPageNumber(),
  ]);
}
