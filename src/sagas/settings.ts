import {
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
} from "../constants/ActionTypes";
import { put, call, all, takeEvery } from "redux-saga/effects";
import api from "../api";

function* updateSettingsRequest(action) {
  try {
    yield call(api, "/seller/marketplaceconfig", {
      method: "PUT",
      data: action.settings,
    });
    yield put({ type: UPDATE_SETTINGS_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_SETTINGS_FAILURE });
  }
}

function* watchUpdateSettingsRequest() {
  yield takeEvery(UPDATE_SETTINGS_REQUEST, updateSettingsRequest);
}

export default function* () {
  yield all([watchUpdateSettingsRequest()]);
}
