import { combineReducers } from "redux";
import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  notification: getRequestReducer([
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
  ]),
});
