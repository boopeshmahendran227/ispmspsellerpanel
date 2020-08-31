import {
  SURE_MODAL_SURE_CLICKED,
  MARK_AS_SHIPPING_REQUEST,
  APPROVE_CANCEL_ORDER_ITEM,
  REJECT_CANCEL_ORDER_ITEM,
  MARK_AS_SHIPPING,
  REJECT_RETURN_ORDER_ITEM,
  APPROVE_RETURN_ORDER_ITEM,
  APPROVE_CANCEL_ORDER_ITEM_REQUEST,
  REJECT_CANCEL_ORDER_ITEM_REQUEST,
  APPROVE_RETURN_ORDER_ITEM_REQUEST,
  REJECT_RETURN_ORDER_ITEM_REQUEST,
  SURE_MODAL_CANCEL_CLICKED,
  REJECT_QUOTE,
  REJECT_QUOTE_REQUEST,
  MARK_PACKAGE_READY_FOR_COLLECTION,
  MARK_PACKAGE_READY_FOR_COLLECTION_REQUEST,
  CLONE_PRODUCT,
  CLONE_PRODUCT_REQUEST,
} from "../constants/ActionTypes";
import { take, all, put, race, call } from "redux-saga/effects";
import UIActions from "../actions/ui";

function* handleSure(initAction, successAction) {
  const { sureClicked, cancelClicked } = yield race({
    sureClicked: take(SURE_MODAL_SURE_CLICKED),
    cancelClicked: take(SURE_MODAL_CANCEL_CLICKED),
  });

  if (sureClicked) {
    yield put({ ...initAction, type: successAction });
  }
  yield put(UIActions.hideSureModal());
}

function* approveCancelOrderItem() {
  while (true) {
    const action = yield take(APPROVE_CANCEL_ORDER_ITEM);
    yield put(
      UIActions.showSureModal(
        "Confirm Cancellation",
        `Are you sure you want to approve the cancellation request for Order Item #${action.orderItemId}?`
      )
    );
    yield call(handleSure, action, APPROVE_CANCEL_ORDER_ITEM_REQUEST);
  }
}

function* rejectCancelOrderItem() {
  while (true) {
    const action = yield take(REJECT_CANCEL_ORDER_ITEM);
    yield put(
      UIActions.showSureModal(
        "Confirm Rejection",
        `Are you sure you want to reject the cancellation request for Order Item #${action.orderItemId}?`
      )
    );
    yield call(handleSure, action, REJECT_CANCEL_ORDER_ITEM_REQUEST);
  }
}

function* approveReturnOrderitem() {
  while (true) {
    const action = yield take(APPROVE_RETURN_ORDER_ITEM);
    yield put(
      UIActions.showSureModal(
        "Confirm Return request",
        `Are you sure you want to approve the return request and schedule pickup for Order Item #${action.orderItemId}?`
      )
    );
    yield call(handleSure, action, APPROVE_RETURN_ORDER_ITEM_REQUEST);
  }
}

function* rejectReturnOrderItem() {
  while (true) {
    const action = yield take(REJECT_RETURN_ORDER_ITEM);
    yield put(
      UIActions.showSureModal(
        "Confirm Rejection",
        `Are you sure you want to reject the return request for Order Item #${action.orderItemId}?`
      )
    );
    yield call(handleSure, action, REJECT_RETURN_ORDER_ITEM_REQUEST);
  }
}

function* markAsShipping() {
  while (true) {
    const action = yield take(MARK_AS_SHIPPING);
    yield put(
      UIActions.showSureModal(
        "Confirm Shipping",
        `Are you sure you want to mark Order Item #${action.orderItemId} as Shipping?`
      )
    );
    yield call(handleSure, action, MARK_AS_SHIPPING_REQUEST);
  }
}

function* cloneProduct() {
  while (true) {
    const action = yield take(CLONE_PRODUCT);
    yield put(
      UIActions.showSureModal(
        "Confirmation",
        `Are you sure you want to Confirm`
      )
    );
    yield call(handleSure, action, CLONE_PRODUCT_REQUEST);
  }
}

function* markPackageReadyForCollection() {
  while (true) {
    const action = yield take(MARK_PACKAGE_READY_FOR_COLLECTION);
    yield put(
      UIActions.showSureModal(
        "Confirm Package Ready",
        `Are you sure you want to mark Order Item #${action.orderItemId} as Ready for Collection?`
      )
    );
    yield call(handleSure, action, MARK_PACKAGE_READY_FOR_COLLECTION_REQUEST);
  }
}

function* rejectQuote() {
  while (true) {
    const action = yield take(REJECT_QUOTE);
    yield put(
      UIActions.showSureModal(
        "Confirm Quote Rejection",
        `Are you sure you want to reject Quote #${action.quote.id}?`
      )
    );
    yield call(handleSure, action, REJECT_QUOTE_REQUEST);
  }
}

export default function* () {
  yield all([
    approveCancelOrderItem(),
    rejectCancelOrderItem(),
    approveReturnOrderitem(),
    rejectReturnOrderItem(),
    markAsShipping(),
    markPackageReadyForCollection(),
    rejectQuote(),
    cloneProduct(),
  ]);
}
