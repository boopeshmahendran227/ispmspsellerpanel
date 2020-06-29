import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_BY_TEXT,
  SET_SEARCH_CURRENT_PAGE_NUMBER,
  CLEAR_FILTERS,
} from "../constants/ActionTypes";
import { takeLatest, all, call, put, select, take } from "redux-saga/effects";
import api from "../api";
import { getFilterData, getCurrentPageNumber } from "../selectors/search";
import SearchActions from "../actions/search";
import { makeErrorAction } from "../utils/error";

function* search() {
  try {
    const filterData = yield select(getFilterData);
    const currentPageNumber = yield select(getCurrentPageNumber);

    const data = yield call(api, "/product/search/seller", {
      method: "POST",
      data: {
        ...filterData,
        categoryId: 1,
        pageNumber: currentPageNumber,
        orderByPrice: 0,
        attributeFilters: [],
        brandId: [],
        sellerIds: [],
      },
    });
    yield put({ type: SEARCH_SUCCESS, data: data });
  } catch (err) {
    yield put(makeErrorAction(SEARCH_FAILURE, err?.response?.data));
  }
}

function* watchFilters() {
  while (true) {
    const action = yield take([
      SEARCH_BY_TEXT,
      CLEAR_FILTERS,
      SET_SEARCH_CURRENT_PAGE_NUMBER,
    ]);

    // Reset page number to 1 on new search
    if (action.type !== SET_SEARCH_CURRENT_PAGE_NUMBER) {
      yield put(SearchActions.setSearchCurrentPageNumber(1));
    }
    yield put({ type: SEARCH_REQUEST });
  }
}

function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, search);
}

export default function* () {
  yield all([watchFilters(), watchSearch()]);
}
