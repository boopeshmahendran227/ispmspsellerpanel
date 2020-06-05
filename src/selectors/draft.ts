import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { PaginationDataInterface } from "../types/pagination";

const getDrafts = createSelector(
  (state: RootState) => state.draft,
  (draft) => draft.drafts.data?.results
);

const getCurrentPageNumber = createSelector(
  (state: RootState) => state.draft,
  (draft): number => draft.currentPageNumber
);

const getDraftPaginationData = createSelector(
  (state: RootState) => state.draft,
  (draft): PaginationDataInterface =>
    draft.drafts.data || {
      totalItems: 0,
      totalPages: 0,
      currentPageNumber: 0,
      currentPageSize: 0,
    }
);

export { getDrafts, getCurrentPageNumber, getDraftPaginationData };
