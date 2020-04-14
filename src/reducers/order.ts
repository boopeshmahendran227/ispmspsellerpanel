import { combineReducers } from "redux";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  order: getRequestReducer([
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
  ]),
});
