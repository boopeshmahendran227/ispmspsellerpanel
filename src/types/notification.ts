import {
  INCREMENT_UNREAD_NOTIFICATION_COUNT,
  CLEAR_UNREAD_NOTIFICATION_COUNT,
} from "../constants/ActionTypes";

interface IncrementUnreadNotificationCountAction {
  type: typeof INCREMENT_UNREAD_NOTIFICATION_COUNT;
}

interface ClearUnreadNotificationCountAction {
  type: typeof CLEAR_UNREAD_NOTIFICATION_COUNT;
}

export type NotificationActionType =
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
