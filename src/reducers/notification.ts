import { combineReducers } from "redux";
import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";
import { getRequestReducer } from "./utils";
import { NotificationActionType } from "../types/notification";

const getUnreadNotificationCount = (
  state: number = 0,
  action: NotificationActionType
) => {
  switch (action.type) {
    case INCREMENT_UNREAD_NOTIFICATION_COUNT:
      return state + 1;
    case CLEAR_UNREAD_NOTIFICATION_COUNT:
      return 0;
  }
  return state;
};

export default combineReducers({
  notification: getRequestReducer([
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
  ]),
  unreadNotificationCount: getUnreadNotificationCount,
});
