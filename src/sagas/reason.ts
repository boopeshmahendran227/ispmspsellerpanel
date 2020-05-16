import {
  CANCEL_ORDER_ITEM,
  CANCEL_ORDER_ITEM_REQUEST,
  REASON_MODAL_CANCEL_CLICKED,
  REASON_MODAL_SUBMIT_CLICKED,
} from "../constants/ActionTypes";
import { take, all, put, race } from "redux-saga/effects";
import UIActions from "../actions/ui";

function* cancelOrderItem() {
  while (true) {
    const action = yield take(CANCEL_ORDER_ITEM);
    yield put(
      UIActions.showReasonModal(
        "Confirm Cancellation",
        "Please provide a cancellation reason",
        ["OrderedByMistake", "NoLongerNeedIt"]
      )
    );
    const { submitClickedAction, cancelClickedAction } = yield race({
      submitClickedAction: take(REASON_MODAL_SUBMIT_CLICKED),
      cancelClickedAction: take(REASON_MODAL_CANCEL_CLICKED),
    });

    if (submitClickedAction) {
      yield put({
        ...action,
        type: CANCEL_ORDER_ITEM_REQUEST,
        reason: submitClickedAction.reason,
      });
    }
    yield put(UIActions.hideReasonModal());
  }
}

export default function* () {
  yield all([cancelOrderItem()]);
}
