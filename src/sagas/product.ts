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
import { takeEvery, all, call, put, select } from "redux-saga/effects";
import api from "../api";
import {
  ProductInputInterface,
  SelectedAttributeValuesMap,
  AttributeValueInterface,
} from "../types/product";
import { getSelectedAttributeValues } from "../selectors/product";
import _ from "lodash";

function* addProduct(action) {
  try {
    // Todo: Move the product transformation to seperate module
    const product: ProductInputInterface = action.product;
    const selectedAttributeValues: SelectedAttributeValuesMap = yield select(
      getSelectedAttributeValues
    );

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
        skuDetails: product.skus.map((sku) => ({
          ...sku,
          price: Number(sku.price),
          boughtPrice: Number(sku.boughtPrice),
          qty: Number(sku.qty),
        })),
        loanIds: [],
        upSellProductIds: [],
        crossSellProductIds: [],
        ecosystemIds: ["ecosystem1"],
        productFaqs: product.faqs,
        allProductAttributeValueIds: _.chain(selectedAttributeValues)
          .keys()
          .map((attributeId) => {
            const attributeValues: AttributeValueInterface[] =
              selectedAttributeValues[attributeId];

            return attributeValues.map((attributeValue) => ({
              attributeId: Number(attributeId),
              valueId: attributeValue.id,
            }));
          })
          .flatten(),
        taxGroupId: product.taxGroup.value,
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
