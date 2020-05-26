import { combineReducers } from "redux";
import {
  GET_PRODUCT_DRAFTS_REQUEST,
  GET_PRODUCT_DRAFTS_SUCCESS,
  GET_PRODUCT_DRAFTS_FAILURE,
  SET_DRAFT_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import { DraftActionType } from "../types/draft";

const updateCurrentPageNumber = (
  state = 1,
  action: DraftActionType
): number => {
  switch (action.type) {
    case SET_DRAFT_CURRENT_PAGE_NUMBER:
      return action.value;
  }

  return state;
};

export default combineReducers({
  drafts: getRequestReducer([
    GET_PRODUCT_DRAFTS_REQUEST,
    GET_PRODUCT_DRAFTS_SUCCESS,
    GET_PRODUCT_DRAFTS_FAILURE,
  ]),
  currentPageNumber: updateCurrentPageNumber,
});
