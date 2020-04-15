import {
  GET_NOTIFICATIONS_REQUEST,
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";

interface GetNotificationAction {
  type: typeof GET_NOTIFICATIONS_REQUEST;
}

interface IncrementUnreadNotificationCountAction {
  type: typeof INCREMENT_UNREAD_NOTIFICATION_COUNT;
}

interface ClearUnreadNotificationCountAction {
  type: typeof CLEAR_UNREAD_NOTIFICATION_COUNT;
}

export type NotificationActionType =
  | GetNotificationAction
  | IncrementUnreadNotificationCountAction
  | ClearUnreadNotificationCountAction;

export interface NotificationItemInterface {
  id: number;
  subject: string;
  message: string;
  type: string;
  metadata: string;
  isRead: boolean;
  createdDateTime: string;
}
