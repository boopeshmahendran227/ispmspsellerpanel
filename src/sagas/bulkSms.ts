import { takeEvery, all, put, call } from "redux-saga/effects";
import {
  SEND_BULKSMS_FAILURE,
  SEND_BULKSMS_REQUEST,
  SEND_BULKSMS_SUCCESS,
} from "src/constants/ActionTypes";
import { sendBulkSmsAction } from "types/bulkSms";
import api from "../api";

function* sendBulkSms(action: sendBulkSmsAction) {
  try {
    yield call(api, "/bulksms", {
      method: "POST",
      data: action.bulkSmsData,
    });
    yield put({ type: SEND_BULKSMS_SUCCESS });
  } catch (err) {
    yield put({ type: SEND_BULKSMS_FAILURE });
  }
}

function* watchSendBulkSms() {
  yield takeEvery(SEND_BULKSMS_REQUEST, sendBulkSms);
}

export default function* () {
  yield all([watchSendBulkSms()]);
}
