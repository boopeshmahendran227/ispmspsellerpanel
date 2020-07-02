import {
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";
import { NotificationActionType } from "../types/notification";

const incrementUnreadNotificationCount = (): NotificationActionType => {
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
  incrementUnreadNotificationCount,
  clearUnreadNotificationCount,
};
