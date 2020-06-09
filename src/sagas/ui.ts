import { MARK_AS_SHIPPING_COMPLETE } from "../constants/ActionTypes";
import { take, all, put } from "redux-saga/effects";
import UIActions from "../actions/ui";

function* watchMarkAsShippingComplete() {
  while (true) {
    const action = yield take(MARK_AS_SHIPPING_COMPLETE);
    yield put(UIActions.showDeliveryCodeModal());
  }
}

export default function* () {
  yield all([watchMarkAsShippingComplete()]);
}
