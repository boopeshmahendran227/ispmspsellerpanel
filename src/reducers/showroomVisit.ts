import { combineReducers } from "redux";
import {
  GET_SHOWROOMS_REQUEST,
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
  SET_DATE_RANGE_FILTER_FOR_SHOWROOM_VISIT,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import moment from "moment";
import { DateRangeFilterInterface } from "../types/showroomVisit";

const dateRangeFilter = (
  state: DateRangeFilterInterface = {
    startDate: moment(),
    endDate: moment(),
  },
  action
) => {
  switch (action.type) {
    case SET_DATE_RANGE_FILTER_FOR_SHOWROOM_VISIT:
      return {
        startDate: action.startDate,
        endDate: action.endDate,
      };
  }

  return state;
};

const showroomFilter = (state = null, action) => {
  switch (action.type) {
    case SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT:
      return action.showroomId;
  }

  return state;
};

export default combineReducers({
  showrooms: getRequestReducer([
    GET_SHOWROOMS_REQUEST,
    GET_SHOWROOMS_SUCCESS,
    GET_SHOWROOMS_FAILURE,
  ]),
  showroomVisits: getRequestReducer([
    GET_FILTERED_SHOWROOM_VISITS_REQUEST,
    GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
    GET_FILTERED_SHOWROOM_VISITS_FAILURE,
  ]),
  filters: combineReducers({
    dateRange: dateRangeFilter,
    showroomId: showroomFilter,
  }),
});
