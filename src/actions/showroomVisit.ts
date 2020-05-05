import {
  GET_SHOWROOMS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
  SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
} from "../constants/ActionTypes";
import moment from "moment";
import { ShowroomVisitActionType } from "../types/showroomVisit";

const getShowrooms = (): ShowroomVisitActionType => {
  return {
    type: GET_SHOWROOMS_REQUEST,
  };
};

const getFilteredShowroomVisits = (): ShowroomVisitActionType => {
  return {
    type: GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  };
};

const setDateFilter = (date: moment.Moment): ShowroomVisitActionType => {
  return {
    type: SET_DATE_FILTER_FOR_SHOWROOM_VISIT,
    date,
  };
};

const setShowroomFilter = (showroomId): ShowroomVisitActionType => {
  return {
    type: SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
    showroomId,
  };
};

export default {
  getShowrooms,
  getFilteredShowroomVisits,
  setDateFilter,
  setShowroomFilter,
};
