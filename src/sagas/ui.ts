import {
  MARK_AS_SHIPPING_COMPLETE,
  DELIVERY_CODE_MODAL_SUBMIT_CLICKED,
  DELIVERY_CODE_MODAL_CANCEL_CLICKED,
  MARK_AS_SHIPPING_COMPLETE_REQUEST,
} from "../constants/ActionTypes";
import { take, race, all, put } from "redux-saga/effects";
import UIActions from "../actions/ui";

function* watchMarkAsShippingComplete() {
  while (true) {
    const action = yield take(MARK_AS_SHIPPING_COMPLETE);
    yield put(UIActions.showDeliveryCodeModal());

    const { submitClickedAction, cancelClickedAction } = yield race({
      submitClickedAction: take(DELIVERY_CODE_MODAL_SUBMIT_CLICKED),
      cancelClickedAction: take(DELIVERY_CODE_MODAL_CANCEL_CLICKED),
    });

    if (submitClickedAction) {
      yield put({
        ...action,
        type: MARK_AS_SHIPPING_COMPLETE_REQUEST,
        deliveryCode: submitClickedAction.deliveryCode,
      });
    }
    yield put(UIActions.hideDeliveryCodeModal());
  }
}

export default function* () {
  yield all([watchMarkAsShippingComplete()]);
}
