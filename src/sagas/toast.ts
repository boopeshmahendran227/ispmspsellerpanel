import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAILURE,
  REJECT_QUOTE_SUCCESS,
  REJECT_QUOTE_FAILURE,
  ADD_ATTRIBUTE_FAILURE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_VALUE_SUCCESS,
  ADD_ATTRIBUTE_VALUE_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  CREATE_COUPON_SUCCESS,
  CREATE_COUPON_FAILURE,
  UPDATE_CREDITS_REQUEST,
  UPDATE_CREDITS_FAILURE,
  UPDATE_CREDITS_SUCCESS,
  UPDATE_SHIPPING_INFORMATION_SUCCESS,
  UPDATE_SHIPPING_INFORMATION_FAILURE,
} from "../constants/ActionTypes";
import { put, take } from "redux-saga/effects";
import ToastActions from "../actions/toast";
import { ToastType } from "../types/toast";

// Exported only for testing
export const toasts = {
  [CHANGE_ORDER_ITEM_STATUS_SUCCESS]: {
    type: ToastType.success,
    msg: "Order Item Status successfully changed",
  },
  [CHANGE_ORDER_ITEM_STATUS_FAILURE]: {
    type: ToastType.error,
    msg: "Order Item Status updation failed. Please try again",
  },
  [UPDATE_QUOTE_SUCCESS]: {
    type: ToastType.success,
    msg: "Quote successfully updated",
  },
  [UPDATE_QUOTE_FAILURE]: {
    type: ToastType.error,
    msg: "Quote updation failed. Please try again",
  },
  [REJECT_QUOTE_SUCCESS]: {
    type: ToastType.success,
    msg: "Quote successfully rejected",
  },
  [REJECT_QUOTE_FAILURE]: {
    type: ToastType.error,
    msg: "Quote Rejection failed. Please try again",
  },
  [ADD_ATTRIBUTE_SUCCESS]: {
    type: ToastType.success,
    msg: "Attribute successfully added",
  },
  [ADD_ATTRIBUTE_FAILURE]: {
    type: ToastType.error,
    msg: "Attribute addition failed. Please try again",
  },
  [ADD_ATTRIBUTE_VALUE_SUCCESS]: {
    type: ToastType.success,
    msg: "Attribute value successfully added",
  },
  [ADD_ATTRIBUTE_VALUE_FAILURE]: {
    type: ToastType.error,
    msg: "Attribute value addition failed. Please try again",
  },
  [ADD_PRODUCT_SUCCESS]: {
    type: ToastType.success,
    msg: "Product Draft Created and has been sent to admin for approval",
  },
  [ADD_PRODUCT_FAILURE]: {
    type: ToastType.error,
    msg: "Product Draft Creation failed. Please try again",
  },
  [CREATE_COUPON_SUCCESS]: {
    type: ToastType.success,
    msg: "Coupon Created Successfully",
  },
  [CREATE_COUPON_FAILURE]: {
    type: ToastType.error,
    msg: "Coupon Creation Failed",
  },
  [UPDATE_CREDITS_SUCCESS]: {
    type: ToastType.success,
    msg: "Credits Updated Successfully",
  },
  [UPDATE_CREDITS_FAILURE]: {
    type: ToastType.error,
    msg: "Credits Updation Failed",
  },
  [UPDATE_SHIPPING_INFORMATION_SUCCESS]: {
    type: ToastType.success,
    msg: "Shipping Information Updated Successfully",
  },
  [UPDATE_SHIPPING_INFORMATION_FAILURE]: {
    type: ToastType.error,
    msg: "Shipping Information Updation Failed",
  },
};

function* watchToasts() {
  while (true) {
    const action = yield take(Object.keys(toasts));
    yield put(ToastActions.addToast(toasts[action.type]));
  }
}

export default function* () {
  yield watchToasts();
}
