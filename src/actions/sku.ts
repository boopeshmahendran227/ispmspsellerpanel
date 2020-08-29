import { ADD_SKU_REQUEST, UPDATE_SKU_REQUEST } from "../constants/ActionTypes";
import {
  AddSkuInterface,
  UpdateSkuInterface,
  SkuActionType,
} from "../types/sku";

const addSku = (sku: AddSkuInterface): SkuActionType => {
  return {
    type: ADD_SKU_REQUEST,
    sku,
  };
};

const updateSku = (sku: UpdateSkuInterface): SkuActionType => {
  return {
    type: UPDATE_SKU_REQUEST,
    sku,
  };
};

export default {
  addSku,
  updateSku,
};
