import {
  GET_SHOWROOMS_REQUEST,
  GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
  SET_DATE_RANGE_FILTER_FOR_SHOWROOM_VISIT,
} from "../constants/ActionTypes";

const getShowrooms = () => {
  return {
    type: GET_SHOWROOMS_REQUEST,
  };
};

const getFilteredShowroomVisits = () => {
  return {
    type: GET_FILTERED_SHOWROOM_VISITS_REQUEST,
  };
};

const setDateRangeFilter = ({ startDate, endDate }) => {
  return {
    type: SET_DATE_RANGE_FILTER_FOR_SHOWROOM_VISIT,
    startDate,
    endDate,
  };
};

const setShowroomFilter = (staffId) => {
  return {
    type: SET_SHOWROOM_FILTER_FOR_SHOWROOM_VISIT,
    staffId,
  };
};

export default {
  getShowrooms,
  getFilteredShowroomVisits,
  setDateRangeFilter,
  setShowroomFilter,
};
