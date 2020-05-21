import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { FilterDataInterface, SearchMetadataInterface } from "../types/search";

const getFilterData = createSelector(
  (state: RootState) => state.search,
  (search): FilterDataInterface => search.filterData
);

const getSearchResults = createSelector(
  (state: RootState) => state.search,
  (search) => search.searchResults.data?.results
);

const getSearchMetadata = createSelector(
  (state: RootState) => state.search,
  (search): SearchMetadataInterface =>
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
  getSearchMetadata,
};
