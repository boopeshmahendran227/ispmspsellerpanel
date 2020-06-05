import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { FilterDataInterface } from "../types/search";
import { PaginationDataInterface } from "../types/pagination";

const getFilterData = createSelector(
  (state: RootState) => state.search,
  (search): FilterDataInterface => search.filterData
);

const getSearchResults = createSelector(
  (state: RootState) => state.search,
  (search) => search.searchResults.data?.results
);

const getSearchPaginationData = createSelector(
  (state: RootState) => state.search,
  (search): PaginationDataInterface =>
    search.searchResults.data || {
      totalItems: 0,
      totalPages: 0,
      currentPageNumber: 0,
      currentPageSize: 0,
    }
);

const getCurrentPageNumber = createSelector(
  (state: RootState) => state.search,
  (search): number => search.currentPageNumber
);

export {
  getFilterData,
  getSearchResults,
  getCurrentPageNumber,
  getSearchPaginationData,
};
