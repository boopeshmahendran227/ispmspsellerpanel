import {
  GET_NOTIFICATIONS_REQUEST,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";
import { NotificationActionType } from "../types/notification";

const getNotifications = (): NotificationActionType => {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
  };
};

const incrementUnreadNotificationCount = (): NotificationActionType => {
  console.log("oiwuer");
  return {
    type: INCREMENT_UNREAD_NOTIFICATION_COUNT,
  };
};

const clearUnreadNotificationCount = (): NotificationActionType => {
  return {
    type: CLEAR_UNREAD_NOTIFICATION_COUNT,
  };
};

export default {
  getNotifications,
  incrementUnreadNotificationCount,
  clearUnreadNotificationCount,
};
