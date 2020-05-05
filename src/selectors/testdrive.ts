import { RootState } from "../reducers";
import { createSelector } from "reselect";

const getTestdrives = createSelector(
  (state: RootState) => state.testdrive,
  (testdrive) => testdrive.testdrive.data
);

export { getTestdrives };
