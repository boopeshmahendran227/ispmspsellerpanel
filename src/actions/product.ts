import { ADD_PRODUCT_REQUEST } from "../constants/ActionTypes";

const addProduct = product => {
  return {
    type: ADD_PRODUCT_REQUEST,
    product
  };
};

export default {
  addProduct
};
