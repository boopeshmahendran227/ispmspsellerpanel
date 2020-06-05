import { combineReducers } from "redux";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  SET_ORDER_CURRENT_PAGE_NUMBER,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import { OrderActionType } from "../types/order";

const getCurrentlyProcessingOrderItemIds = (
  state: number[] = [],
  action: OrderActionType
) => {
  switch (action.type) {
    case CHANGE_ORDER_ITEM_STATUS_REQUEST:
      const index = state.indexOf(action.orderItemId);

      if (index !== -1) {
        return state;
      }

      return [...state, action.orderItemId];
    case CHANGE_ORDER_ITEM_STATUS_SUCCESS:
    case CHANGE_ORDER_ITEM_STATUS_FAILURE:
      return state.filter((orderItemId) => orderItemId !== action.orderItemId);
  }
  return state;
};

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

export default combineReducers({
  order: getRequestReducer([
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
  ]),
  currentlyProcessingOrderItemIds: getCurrentlyProcessingOrderItemIds,
  currentPageNumber: updateCurrentPageNumber,
});
