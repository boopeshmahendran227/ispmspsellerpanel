import {
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
  GET_SHOWROOMS_REQUEST,
  SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
} from "../constants/ActionTypes";
import { takeEvery, call, put, select, all, take } from "redux-saga/effects";
import {
  getShowroomFilterForShowroomVisit,
  getDateFilterForShowroomVisit,
} from "../selectors/showroomVisit";
import api from "../api";
import moment from "moment";

function* getFilteredShowroomVisits() {
  try {
    const dateFilter = yield select(getDateFilterForShowroomVisit);
    const showroomFilter = yield select(getShowroomFilterForShowroomVisit);

    const data = yield call(api, "/showroom/seller", {
      params: {
        showroomId: showroomFilter,
        date: moment(dateFilter).utc().format("YYYY-MM-DD"),
      },
    });
    yield put({ type: GET_FILTERED_SHOWROOM_VISITS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_FILTERED_SHOWROOM_VISITS_FAILURE });
  }
}

function* getShowrooms() {
  try {
    const data = yield call(api, "/showroom/short");
    yield put({ type: GET_SHOWROOMS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_SHOWROOMS_FAILURE });
  }
}

function* watchGetFilteredShowroomVisits() {
  yield takeEvery(
    GET_FILTERED_SHOWROOM_VISITS_REQUEST,
    getFilteredShowroomVisits
  );
}

function* watchFilters() {
  while (true) {
    yield take([
      SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
      SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
    ]);
    yield put({ type: GET_FILTERED_SHOWROOM_VISITS_REQUEST });
  }
}

function* watchGetShowrooms() {
  yield takeEvery(GET_SHOWROOMS_REQUEST, getShowrooms);
}

export default function* () {
  yield all([
    watchGetFilteredShowroomVisits(),
    watchGetShowrooms(),
    watchFilters(),
  ]);
}
