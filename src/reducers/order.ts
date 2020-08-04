import { combineReducers } from "redux";
import {
  GET_FILTERED_ORDERS_REQUEST,
  GET_FILTERED_ORDERS_SUCCESS,
  GET_FILTERED_ORDERS_FAILURE,
  SET_ORDER_CURRENT_PAGE_NUMBER,
  SET_ECOSYSTEM_FILTER_FOR_ORDERS,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import { OrderActionType } from "../types/order";

const updateCurrentPageNumber = (
  state = 1,
  action: OrderActionType
): number => {
  switch (action.type) {
    case SET_ORDER_CURRENT_PAGE_NUMBER:
      return action.value;
  }

  return state;
};

const ecosystemFilter = (state = null, action: OrderActionType): string => {
  switch (action.type) {
    case SET_ECOSYSTEM_FILTER_FOR_ORDERS:
      return action.ecosystemId;
  }

  return state;
};

export default combineReducers({
  order: getRequestReducer([
    GET_FILTERED_ORDERS_REQUEST,
    GET_FILTERED_ORDERS_SUCCESS,
    GET_FILTERED_ORDERS_FAILURE,
  ]),
  currentPageNumber: updateCurrentPageNumber,
  filters: combineReducers({
    ecosystem: ecosystemFilter,
  }),
});
