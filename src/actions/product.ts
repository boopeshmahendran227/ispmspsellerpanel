import {
  ADD_ATTRIBUTE_REQUEST,
  SET_SELECTED_ATTRIBUTES,
} from "../constants/ActionTypes";
import {
  AddAttributeInterface,
  ProductActionType,
  SelectedAttribute,
} from "../types/product";

const addAttribute = (attribute: AddAttributeInterface): ProductActionType => {
  return {
    type: ADD_ATTRIBUTE_REQUEST,
    attribute,
  };
};

const setSelectedAttributes = (
  attributes: SelectedAttribute[]
): ProductActionType => {
  return {
    type: SET_SELECTED_ATTRIBUTES,
    attributes,
  };
};

export default {
  addAttribute,
  setSelectedAttributes,
};
