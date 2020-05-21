import { combineReducers } from "redux";
import {
  SEARCH_BY_TEXT,
  CLEAR_FILTERS,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_SEARCH_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import { SearchActionType, FilterDataInterface } from "../types/search";

const updateFilterData = (
  state = {
    searchText: "",
  },
  action: SearchActionType
): FilterDataInterface => {
  switch (action.type) {
    case SEARCH_BY_TEXT:
      return {
        ...state,
        searchText: action.text,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        searchText: "",
      };
  }

  return state;
};

const updateCurrentPageNumber = (
  state = 1,
  action: SearchActionType
): number => {
  switch (action.type) {
    case SET_SEARCH_CURRENT_PAGE_NUMBER:
      return action.value;
  }

  return state;
};

export default combineReducers({
  filterData: updateFilterData,
  searchResults: getRequestReducer([
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
  ]),
  currentPageNumber: updateCurrentPageNumber,
});
