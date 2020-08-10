import {
  ADD_SKU_REQUEST,
  ADD_SKU_SUCCESS,
  ADD_SKU_FAILURE,
  UPDATE_SKU_REQUEST,
  UPDATE_SKU_SUCCESS,
  UPDATE_SKU_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";
import { EditSkuInterface } from "../types/sku";
import _ from "lodash";

function* addSku(action) {
  try {
    const sku = action.sku;
    yield call(api, "/product/sku", {
      method: "POST",
      data: sku,
    });
    yield put({ type: ADD_SKU_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_SKU_FAILURE });
  }
}

function* updateSku(action) {
  try {
    const sku = action.sku;
    yield call(api, "/product/sku", {
      method: "PUT",
      data: sku,
    });
    yield put({ type: UPDATE_SKU_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_SKU_FAILURE });
  }
}

function* watchAddSku() {
  yield takeEvery(ADD_SKU_REQUEST, addSku);
}

function* watchUpdateSku() {
  yield takeEvery(UPDATE_SKU_REQUEST, updateSku);
}

export default function* () {
  yield all([watchAddSku(), watchUpdateSku()]);
}
