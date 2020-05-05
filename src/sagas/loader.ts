import { put, take, all } from "redux-saga/effects";
import UIActions from "../actions/ui";
import {
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
} from "../constants/ActionTypes";

const openActionItems = [GET_FILTERED_SHOWROOM_VISITS_REQUEST];
const closeActions = [
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
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
