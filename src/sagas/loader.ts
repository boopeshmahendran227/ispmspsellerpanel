import { put, take, all } from "redux-saga/effects";
import UIActions from "../actions/ui";
import {
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  UPDATE_QUOTE_REQUEST,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAILURE,
  ADD_ATTRIBUTE_REQUEST,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  REJECT_QUOTE_REQUEST,
  REJECT_QUOTE_SUCCESS,
  REJECT_QUOTE_FAILURE,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "../constants/ActionTypes";

const openActionItems = [
  SEARCH_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  UPDATE_QUOTE_REQUEST,
  REJECT_QUOTE_REQUEST,
  ADD_ATTRIBUTE_REQUEST,
  ADD_PRODUCT_REQUEST,
];

const closeActions = [
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAILURE,
  REJECT_QUOTE_SUCCESS,
  REJECT_QUOTE_FAILURE,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
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
