import { combineReducers } from "redux";
import {
  GET_SHOWROOMS_REQUEST,
  GET_SHOWROOMS_SUCCESS,
  GET_SHOWROOMS_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  showrooms: getRequestReducer([
    GET_SHOWROOMS_REQUEST,
    GET_SHOWROOMS_SUCCESS,
    GET_SHOWROOMS_FAILURE,
  ]),
});
