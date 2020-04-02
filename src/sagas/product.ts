import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";

function* addProduct() {
  try {
    yield call(api, "/product", {
      method: "POST",
      data: {}
    });
    yield put({ type: ADD_PRODUCT_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_PRODUCT_FAILURE });
  }
}

function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT_REQUEST, addProduct);
}

export default function*() {
  yield all([watchAddProduct()]);
}
