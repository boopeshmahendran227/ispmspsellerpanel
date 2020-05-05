import { combineReducers } from "redux";
import {
  GET_TEST_DRIVES_REQUEST,
  GET_TEST_DRIVES_SUCCESS,
  GET_TEST_DRIVES_FAILURE,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";

export default combineReducers({
  testdrive: getRequestReducer([
    GET_TEST_DRIVES_REQUEST,
    GET_TEST_DRIVES_SUCCESS,
    GET_TEST_DRIVES_FAILURE,
  ]),
});
