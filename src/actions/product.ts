import {
  ADD_ATTRIBUTE_REQUEST,
  SET_SELECTED_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTE_VALUES,
} from "../constants/ActionTypes";
import {
  AddAttributeInterface,
  ProductActionType,
  SelectedAttribute,
  AttributeValueInterface,
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

const setSelectedAttributeValues = (
  attributeId: number,
  values: AttributeValueInterface[]
): ProductActionType => {
  return {
    type: SET_SELECTED_ATTRIBUTE_VALUES,
    attributeId,
    values,
  };
};

export default {
  addAttribute,
  setSelectedAttributes,
  setSelectedAttributeValues,
};
