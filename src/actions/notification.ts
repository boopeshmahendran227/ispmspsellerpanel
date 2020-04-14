import { GET_NOTIFICATIONS_REQUEST } from "../constants/ActionTypes";

const getNotifications = () => {
  return {
    type: GET_NOTIFICATIONS_REQUEST,
  };
};

export default {
  getNotifications,
};
