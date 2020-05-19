import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAILURE,
  REJECT_QUOTE_SUCCESS,
  REJECT_QUOTE_FAILURE,
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
