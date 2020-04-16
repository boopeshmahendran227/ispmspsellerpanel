import { RootState } from "../reducers";
import { createSelector } from "reselect";
import { SureModalData, ReasonModalData } from "../types/ui";

const getSureModalData = createSelector(
  (state: RootState) => state.ui,
  (ui): SureModalData => ui.sureModalData
);

const getReasonModalData = createSelector(
  (state: RootState) => state.ui,
  (ui): ReasonModalData => ui.reasonModalData
);

const getLoadingScreenOpen = createSelector(
  (state: RootState) => state.ui,
  (ui): boolean => ui.loadingScreenOpen
);

export { getSureModalData, getLoadingScreenOpen, getReasonModalData };
