import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../constants/ActionTypes";
import { takeLatest, all, call, put } from "redux-saga/effects";
import api from "../api";
import { destroyCookie } from "nookies";
import { redirectToLogin } from "../utils/login";

function* logout() {
  try {
    const data = yield call(api, "/auth/logout");
    yield call(destroyCookie, null, "userToken");
    yield call(destroyCookie, null, "userRefreshToken");
    yield call(destroyCookie, null, "isp-jwt");
    yield call(destroyCookie, null, "isp-refresh");
    yield put({
      type: LOGOUT_SUCCESS,
      data: data,
    });
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE });
  } finally {
    yield call(redirectToLogin);
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* () {
  yield all([watchLogout()]);
}
