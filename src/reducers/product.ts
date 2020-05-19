import { combineReducers } from "redux";
import { SET_SELECTED_ATTRIBUTES } from "../constants/ActionTypes";
import { SelectedAttribute, ProductActionType } from "../types/product";

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

export default combineReducers({
  selectedAttributes: getSelectedAttributes,
});
