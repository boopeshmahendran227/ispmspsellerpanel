import {
  GET_TEST_DRIVES_REQUEST,
  GET_TEST_DRIVES_SUCCESS,
  GET_TEST_DRIVES_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";

function* getTestdrives() {
  try {
    const data = yield call(api, "/testdrive");
    yield put({ type: GET_TEST_DRIVES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_TEST_DRIVES_FAILURE });
  }
}

function* watchGetTestdrives() {
  yield takeEvery(GET_TEST_DRIVES_REQUEST, getTestdrives);
}

export default function* () {
  yield all([watchGetTestdrives()]);
}
