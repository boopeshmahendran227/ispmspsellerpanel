import {
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
  GET_SHOWROOMS_REQUEST,
} from "../constants/ActionTypes";
import { takeEvery, call, put, all } from "redux-saga/effects";
import api from "../api";

function* getShowrooms() {
  try {
    const data = yield call(api, "/showroom/short");
    yield put({ type: GET_SHOWROOMS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_SHOWROOMS_FAILURE });
  }
}

function* watchGetShowrooms() {
  yield takeEvery(GET_SHOWROOMS_REQUEST, getShowrooms);
}

export default function* () {
  yield all([watchGetShowrooms()]);
}
