import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";
import { NotificationItemInterface } from "../types/notification";
import _ from "lodash";
import moment from "moment";
import { makeErrorAction } from "../utils/error";

function* getNotifications() {
  try {
    const data: NotificationItemInterface[] = yield call(api, "/notification");

    // Sort notifications by created time
    const notifications: NotificationItemInterface[] = _.sortBy(
      data,
      (notification) => moment(notification.createdDateTime)
    ).reverse();

    yield put({ type: GET_NOTIFICATIONS_SUCCESS, data: notifications });
  } catch (err) {
    yield put(makeErrorAction(GET_NOTIFICATIONS_FAILURE, err?.response?.data));
  }
}

function* watchGetNotifications() {
  yield takeEvery(GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export default function* () {
  yield all([watchGetNotifications()]);
}
