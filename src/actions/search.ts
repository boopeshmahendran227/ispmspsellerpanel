import {
  SEARCH_BY_TEXT,
  SET_SEARCH_CURRENT_PAGE_NUMBER,
  CLEAR_FILTERS,
} from "../constants/ActionTypes";
import { SearchActionType } from "../types/search";

const searchByText = (text: string): SearchActionType => {
  return {
    type: SEARCH_BY_TEXT,
    text,
  };
};

const setSearchCurrentPageNumber = (value: number): SearchActionType => {
  return {
    type: SET_SEARCH_CURRENT_PAGE_NUMBER,
    value,
  };
};

const clearFilters = (): SearchActionType => {
  return {
    type: CLEAR_FILTERS,
  };
};

export default {
  searchByText,
  setSearchCurrentPageNumber,
  clearFilters,
};
