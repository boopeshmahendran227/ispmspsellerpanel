import {
  GET_PRODUCT_DRAFTS_REQUEST,
  GET_PRODUCT_DRAFTS_SUCCESS,
  GET_PRODUCT_DRAFTS_FAILURE,
  SET_DRAFT_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { takeLatest, all, call, put, select } from "redux-saga/effects";
import api from "../api";
import { getCurrentPageNumber } from "../selectors/draft";

function* getDrafts() {
  try {
    const currentPageNumber = yield select(getCurrentPageNumber);
    const data = yield call(
      api,
      `/product/draft?pageNumber=${currentPageNumber}`
    );
    yield put({ type: GET_PRODUCT_DRAFTS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_PRODUCT_DRAFTS_FAILURE });
  }
}

function* watchGetDrafts() {
  yield takeLatest(
    [GET_PRODUCT_DRAFTS_REQUEST, SET_DRAFT_CURRENT_PAGE_NUMBER],
    getDrafts
  );
}

export default function* () {
  yield all([watchGetDrafts()]);
}
