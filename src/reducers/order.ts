import { combineReducers } from "redux";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_CURRENT_ORDER_DETAIL_REQUEST,
  GET_CURRENT_ORDER_DETAIL_SUCCESS,
  GET_CURRENT_ORDER_DETAIL_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  order: getRequestReducer([
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
  ]),
  currentOrder: getRequestReducer([
    GET_CURRENT_ORDER_DETAIL_REQUEST,
    GET_CURRENT_ORDER_DETAIL_SUCCESS,
    GET_CURRENT_ORDER_DETAIL_FAILURE,
  ]),
});
