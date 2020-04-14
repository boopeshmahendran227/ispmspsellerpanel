import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { NotificationItemInterface } from "../types/notification";

const getNotifications = createSelector(
  (state: RootState) => state.notification,
  (notification): NotificationItemInterface[] => notification.notification.data
);

export { getNotifications };
