import { combineReducers } from "redux";
import {
  GET_SHOWROOMS_REQUEST,
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
  SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_SUCCESS,
  GET_FILTERED_SHOWROOM_VISITS_FAILURE,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import moment from "moment";

const dateFilter = (state: moment.Moment = moment(), action) => {
  switch (action.type) {
    case SET_DATE_FILTER_FOR_SHOWROOM_VISIT:
      return action.date;
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
    date: dateFilter,
    showroomId: showroomFilter,
  }),
});
