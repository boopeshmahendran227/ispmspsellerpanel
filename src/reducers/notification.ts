import { combineReducers } from "redux";
import {
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";
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
  unreadNotificationCount: getUnreadNotificationCount,
});
