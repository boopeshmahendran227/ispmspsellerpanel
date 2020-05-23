import { combineReducers } from "redux";
import {
  SET_SELECTED_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTE_VALUES_MAP,
} from "../constants/ActionTypes";
import {
  SelectedAttribute,
  ProductActionType,
  SelectedAttributeValuesMap,
} from "../types/product";

const getSelectedAttributes = (
  state: SelectedAttribute[] = [],
  action: ProductActionType
) => {
  switch (action.type) {
    case SET_SELECTED_ATTRIBUTES:
      return action.attributes;
  }
  return state;
};

const getSelectedAttributeValues = (
  state: SelectedAttributeValuesMap = {},
  action: ProductActionType
) => {
  switch (action.type) {
    case SET_SELECTED_ATTRIBUTE_VALUES_MAP:
      return action.value;
  }
  return state;
};

export default combineReducers({
  selectedAttributes: getSelectedAttributes,
  selectedAttributeValues: getSelectedAttributeValues,
});
