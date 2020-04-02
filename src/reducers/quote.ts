import { combineReducers } from "redux";
import {
  GET_QUOTES_REQUEST,
  GET_QUOTES_SUCCESS,
  GET_QUOTES_FAILURE
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  quote: getRequestReducer([
    GET_QUOTES_REQUEST,
    GET_QUOTES_SUCCESS,
    GET_QUOTES_FAILURE
  ])
});
