import {
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
} from "../constants/ActionTypes";
import { put, take, all } from "redux-saga/effects";
import UIActions from "../actions/ui";

const openActionItems = [CHANGE_ORDER_ITEM_STATUS_REQUEST];
const closeActions = [
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
];

function* watchLoadingScreenShow() {
  while (true) {
    yield take(openActionItems);
    yield put(UIActions.showLoadingScreen());
  }
}

function* watchLoadingScreenHide() {
  while (true) {
    yield take(closeActions);
    yield put(UIActions.hideLoadingScreen());
  }
}

export default function* () {
  yield all([watchLoadingScreenShow(), watchLoadingScreenHide()]);
}
