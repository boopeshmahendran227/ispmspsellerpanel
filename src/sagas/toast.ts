import {
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
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
