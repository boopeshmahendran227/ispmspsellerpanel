import { GET_SHOWROOMS_REQUEST } from "../constants/ActionTypes";
import { ShowroomVisitActionType } from "../types/showroomVisit";

const getShowrooms = (): ShowroomVisitActionType => {
  return {
    type: GET_SHOWROOMS_REQUEST,
  };
};

export default {
  getShowrooms,
};
