import { createSelector } from "reselect";
import { RootState } from "../reducers";

const getUnreadNotificationCount = createSelector(
  (state: RootState) => state.notification,
  (notification): number => notification.unreadNotificationCount
);

export { getUnreadNotificationCount };
