import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_ATTRIBUTE_REQUEST,
  ADD_ATTRIBUTE_SUCCESS,
  ADD_ATTRIBUTE_FAILURE,
  ADD_ATTRIBUTE_VALUE_REQUEST,
  ADD_ATTRIBUTE_VALUE_SUCCESS,
  ADD_ATTRIBUTE_VALUE_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put } from "redux-saga/effects";
import api from "../api";
import { ProductInputInterface } from "../types/product";

function* addProduct(action) {
  try {
    // Todo: Move the product transformation to seperate module
    const product: ProductInputInterface = action.product;
    yield call(api, "/product/draft", {
      method: "POST",
      data: {
        ...product,
        maxPrice: Number(product.maxPrice),
        minPrice: Number(product.minPrice),
        specialDiscountValue: Number(product.specialDiscountValue),
        brandId: product.brand.value,
        defaultCategoryId: product.defaultCategory.value,
        parentCategoryIds: product.categories.map((category) => category.value),
        skuDetails: product.skus,
      },
    });
    yield put({ type: ADD_PRODUCT_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_PRODUCT_FAILURE });
  }
}

function* addAttribute(action) {
  try {
    yield call(api, "/attribute", {
      method: "POST",
      data: action.attribute,
    });
    yield put({ type: ADD_ATTRIBUTE_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_ATTRIBUTE_FAILURE });
  }
}

function* addAttributeValue(action) {
  try {
    yield call(api, "/attribute/attrvalue", {
      method: "POST",
      data: {
        attributeId: action.attributeId,
        values: [action.value],
      },
    });
    yield put({ type: ADD_ATTRIBUTE_VALUE_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_ATTRIBUTE_VALUE_FAILURE });
  }
}

function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT_REQUEST, addProduct);
}

function* watchAddAttribute() {
  yield takeEvery(ADD_ATTRIBUTE_REQUEST, addAttribute);
}

function* watchAddAttributeValue() {
  yield takeEvery(ADD_ATTRIBUTE_VALUE_REQUEST, addAttributeValue);
}

export default function* () {
  yield all([watchAddProduct(), watchAddAttribute(), watchAddAttributeValue()]);
}
