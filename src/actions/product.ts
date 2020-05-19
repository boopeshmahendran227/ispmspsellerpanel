import { ADD_ATTRIBUTE_REQUEST } from "../constants/ActionTypes";
import { AddAttributeInterface, ProductActionType } from "../types/product";

const addAttribute = (attribute: AddAttributeInterface): ProductActionType => {
  return {
    type: ADD_ATTRIBUTE_REQUEST,
    attribute,
  };
};

export default {
  addAttribute,
};
