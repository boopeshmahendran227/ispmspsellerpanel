import {
  ADD_ATTRIBUTE_REQUEST,
  SET_SELECTED_ATTRIBUTES,
  ADD_PRODUCT_REQUEST,
  SET_SELECTED_ATTRIBUTE_VALUES_MAP,
  ADD_ATTRIBUTE_VALUE_REQUEST,
  INIT_PRODUCT_CREATE,
  CLONE_PRODUCT,
} from "../constants/ActionTypes";
import {
  AddAttributeInterface,
  ProductActionType,
  SelectedAttribute,
  SelectedAttributeValuesMap,
  ProductInputInterface,
} from "../types/product";

const addAttribute = (attribute: AddAttributeInterface): ProductActionType => {
  return {
    type: ADD_ATTRIBUTE_REQUEST,
    attribute,
  };
};

const addAttributeValue = (
  attributeId: number,
  value: string
): ProductActionType => {
  return {
    type: ADD_ATTRIBUTE_VALUE_REQUEST,
    attributeId,
    value,
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

const setSelectedAttributeValuesMap = (
  value: SelectedAttributeValuesMap
): ProductActionType => {
  return {
    type: SET_SELECTED_ATTRIBUTE_VALUES_MAP,
    value,
  };
};

const addProduct = (product: ProductInputInterface): ProductActionType => {
  return {
    type: ADD_PRODUCT_REQUEST,
    product,
  };
};

const cloneProduct = (product) => {
  return {
    type: CLONE_PRODUCT,
    product,
  };
};

const initProductCreate = (): ProductActionType => {
  return {
    type: INIT_PRODUCT_CREATE,
  };
};

export default {
  addAttribute,
  addAttributeValue,
  setSelectedAttributes,
  setSelectedAttributeValuesMap,
  addProduct,
  initProductCreate,
  cloneProduct,
};
