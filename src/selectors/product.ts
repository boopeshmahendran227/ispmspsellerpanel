import { createSelector } from "reselect";
import { RootState } from "../reducers";
import _ from "lodash";
import { SelectedAttribute } from "../types/product";

const getSelectedAttributes = createSelector(
  (state: RootState) => state.product,
  (product): SelectedAttribute[] => product.selectedAttributes
);

export { getSelectedAttributes };
