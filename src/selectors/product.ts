import { createSelector } from "reselect";
import { RootState } from "../reducers";
import _ from "lodash";
import {
  SelectedAttribute,
  SelectedAttributeValuesMap,
} from "../types/product";

const getSelectedAttributes = createSelector(
  (state: RootState) => state.product,
  (product): SelectedAttribute[] => product.selectedAttributes
);

const getSelectedAttributeValues = createSelector(
  getSelectedAttributes,
  (state: RootState) => state.product,
  (selectedAttributes, product): SelectedAttributeValuesMap => {
    // Return empty array for values if attribute id not present in the map
    return {
      ...selectedAttributes.reduce(
        (acc, attribute) => ({
          ...acc,
          [attribute.attributeId]: [],
        }),
        {}
      ),
      ...product.selectedAttributeValues,
    };
  }
);

export { getSelectedAttributes, getSelectedAttributeValues };
