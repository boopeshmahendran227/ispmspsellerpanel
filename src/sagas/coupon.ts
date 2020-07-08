import {
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_SUCCESS,
  CREATE_COUPON_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, put, call } from "redux-saga/effects";
import api from "../api";
import { CouponActionType } from "../types/coupon";

function* createCoupon(action: CouponActionType) {
  try {
    yield call(api, "/sellercoupon", {
      method: "POST",
      data: action.couponData,
    });
    yield put({ type: CREATE_COUPON_SUCCESS });
  } catch (err) {
    yield put({ type: CREATE_COUPON_FAILURE });
  }
}

function* watchCreateCoupon() {
  yield takeEvery(CREATE_COUPON_REQUEST, createCoupon);
}

export default function* () {
  yield all([watchCreateCoupon()]);
}
