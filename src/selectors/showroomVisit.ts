import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { ShowroomInterface } from "../../src/types/showroomVisit";
import moment from "moment";

const getShowrooms = createSelector(
  (state: RootState) => state.showroomVisit,
  (showroomVisit): ShowroomInterface[] => showroomVisit.showrooms.data
);

const getDateFilterForShowroomVisit = createSelector(
  (state: RootState) => state.showroomVisit,
  (showroomVisit): moment.Moment => showroomVisit.filters.date
);

const getShowroomFilterForShowroomVisit = createSelector(
  (state: RootState) => state.showroomVisit,
  (showroomVisit) => showroomVisit.filters.showroomId
);

const getShowroomVisits = createSelector(
  (state: any) => state.showroomVisit,
  (showroomVisit) => showroomVisit.showroomVisits.data
);

export {
  getShowrooms,
  getDateFilterForShowroomVisit,
  getShowroomFilterForShowroomVisit,
  getShowroomVisits,
};
