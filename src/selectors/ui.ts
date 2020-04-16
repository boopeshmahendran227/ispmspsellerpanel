import { RootState } from "../reducers";
import { createSelector } from "reselect";
import { SureModalData } from "../types/ui";

const getSureModalData = createSelector(
  (state: RootState) => state.ui,
  (ui): SureModalData => ui.sureModalData
);

const getLoadingScreenOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.loadingScreenOpen
);

export { getSureModalData, getLoadingScreenOpen };
