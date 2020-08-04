import {
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  APPROVE_CANCEL_ORDER_ITEM_REQUEST,
  REJECT_CANCEL_ORDER_ITEM_REQUEST,
  APPROVE_RETURN_ORDER_ITEM_REQUEST,
  REJECT_RETURN_ORDER_ITEM_REQUEST,
  MARK_AS_SHIPPING_COMPLETE_REQUEST,
  MARK_AS_SHIPPING_REQUEST,
  CANCEL_ORDER_ITEM_REQUEST,
  MARK_AS_PROCESSING,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put, take } from "redux-saga/effects";
import api from "../api";
import OrderActions from "../actions/order";
import { OrderStatus } from "../types/order";

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
        action.reason
      )
    );
  }
}

export default function* () {
  yield all([watchChangeOrderItemStatus(), watchStatusChange()]);
}
