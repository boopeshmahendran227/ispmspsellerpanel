import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_ATTRIBUTE_REQUEST,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";

function* addProduct() {
  try {
    yield call(api, "/product", {
      method: "POST",
      data: {},
    });
    yield put({ type: ADD_PRODUCT_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_PRODUCT_FAILURE });
  }
}

function* addAttribute(action) {
  try {
    yield call(api, "/attribute", {
      method: "POST",
      data: action.attribute,
    });
    yield put({ type: ADD_ATTRIBUTE_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_ATTRIBUTE_FAILURE });
  }
}

function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT_REQUEST, addProduct);
}

function* watchAddAttribute() {
  yield takeEvery(ADD_ATTRIBUTE_REQUEST, addAttribute);
}

export default function* () {
  yield all([watchAddProduct(), watchAddAttribute()]);
}
