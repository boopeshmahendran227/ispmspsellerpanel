import {
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
  GET_SHOWROOMS_REQUEST,
} from "../constants/ActionTypes";
import { takeEvery, call, put, select, all } from "redux-saga/effects";
import {
  getDateRangeFilterForShowroomVisit,
  getShowroomFilterForShowroomVisit,
} from "../selectors/showroomVisit";
import api from "../api";
import moment from "moment";

function* getFilteredShowroomVisits() {
  try {
    const dateRangeFilter = yield select(getDateRangeFilterForShowroomVisit);
    const showroomFilter = yield select(getShowroomFilterForShowroomVisit);

    const data = yield call(api, "/appointment/search", {
      queryParameters: {
        staffId: showroomFilter,
        startDate: moment(dateRangeFilter.startDate)
          .startOf("day")
          .utc()
          .format(),
        endDate: moment(dateRangeFilter.endDate).endOf("day").utc().format(),
      },
    });
    yield put({ type: GET_FILTERED_SHOWROOM_VISITS_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: GET_FILTERED_SHOWROOM_VISITS_FAILURE });
  }
}

function* getShowrooms() {
  try {
    const data = yield call(api, "/showrooms");
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

function* watchGetShowrooms() {
  yield takeEvery(GET_SHOWROOMS_REQUEST, getShowrooms);
}

export default function* () {
  yield all([watchGetFilteredShowroomVisits(), watchGetShowrooms()]);
}
