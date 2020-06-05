import {
  SEARCH_BY_TEXT,
  CLEAR_FILTERS,
  SET_SEARCH_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";

interface SearchByTextAction {
  type: typeof SEARCH_BY_TEXT;
  text: string;
}

interface ClearFiltersAction {
  type: typeof CLEAR_FILTERS;
}

interface SetSearchCurrentPageNumberAction {
  type: typeof SET_SEARCH_CURRENT_PAGE_NUMBER;
  value: number;
}

export type SearchActionType =
  | SearchByTextAction
  | SetSearchCurrentPageNumberAction
  | ClearFiltersAction;

export interface FilterDataInterface {
  searchText: string;
}
