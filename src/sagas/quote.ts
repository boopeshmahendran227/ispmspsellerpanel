import {
  GET_QUOTES_REQUEST,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";

function* getQuotes() {
  try {
    const data = yield call(api, "/quote", {
      params: {
        sellerId: "2",
      },
    });
    yield put({ type: GET_QUOTES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_QUOTES_FAILURE });
  }
}

function* watchGetQuotes() {
  yield takeEvery(GET_QUOTES_REQUEST, getQuotes);
}

export default function* () {
  yield all([watchGetQuotes()]);
}
