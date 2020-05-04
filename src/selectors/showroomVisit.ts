import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { ShowroomInterface } from "../../src/types/showroomVisit";

const getShowrooms = createSelector(
  (state: RootState) => state.showroomVisit,
  (showroomVisit): ShowroomInterface[] => showroomVisit.showrooms.data
);

const getDateRangeFilterForShowroomVisit = createSelector(
  (state: RootState) => state.showroomVisit,
  (showroomVisit) => showroomVisit.filters.dateRange
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
  getDateRangeFilterForShowroomVisit,
  getShowroomFilterForShowroomVisit,
  getShowroomVisits,
};
