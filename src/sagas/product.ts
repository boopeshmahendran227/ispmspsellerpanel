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
  CLONE_PRODUCT_REQUEST,
  CLONE_PRODUCT_SUCCESS,
  CLONE_PRODUCT_FAILURE,
  UPDATE_TIER_PRICE_SUCCESS,
  UPDATE_TIER_PRICE_FAILURE,
  UPDATE_TIER_PRICE_REQUEST,
  UPDATE_ALL_PRODUCTS_STATUS_FAILURE,
  UPDATE_ALL_PRODUCTS_STATUS_REQUEST,
  UPDATE_ALL_PRODUCTS_STATUS_SUCCESS,
} from "../constants/ActionTypes";
import { takeEvery, all, call, put, select } from "redux-saga/effects";
import api from "../api";
import {
  ProductInputInterface,
  SelectedAttributeValuesMap,
  AttributeValueInterface,
  AddAttributeInterface,
  ProductCloneInterface,
  UpdateTierPriceAction,
} from "../types/product";
import { getSelectedAttributeValues } from "../selectors/product";
import _ from "lodash";
import UpdateAllProductsStatusModal from "components/molecules/UpdateAllProductsStatusModal";

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
        maxPrice: product.maxPrice,
        minPrice: product.minPrice,
        brandId: product.brand?.value,
        hsnCode: product.hsnCode,
        countryOfOrigin: product.countryOfOrigin?.value,
        defaultCategoryId: product.defaultCategory?.value,
        parentCategoryIds: product.categories.map((category) => category.value),
        skuDetails: product.skus.map((sku) => ({
          ...sku,
          price: sku.price,
          boughtPrice: sku.boughtPrice,
          qty: sku.qty,
        })),
        tierPrices: product.tierPrices.map((tierPrice) => ({
          minQty: tierPrice.minQty,
          discountPercentage: tierPrice.discountPercentage,
        })),
        loanIds: [],
        upSellProductIds: [],
        crossSellProductIds: [],
        ecosystemIds: product.ecosystems,
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
        taxGroupId: product.taxGroup?.value,
        productSpecificationDto: product.specification,
      },
    });
    yield put({ type: ADD_PRODUCT_SUCCESS });
  } catch (err) {
    yield put({ type: ADD_PRODUCT_FAILURE });
  }
}

function* cloneProduct(action) {
  try {
    const product: ProductCloneInterface = action.product;
    yield call(api, "/productmigration/copy", {
      method: "PUT",
      params: {
        fromEcosystemId: product.currentEcosystem.value,
        fromSellerId: product.sellerId,
        toEcosystemId: product.targetEcosystem.value,
      },
    });

    yield put({ type: CLONE_PRODUCT_SUCCESS });
  } catch (err) {
    yield put({ type: CLONE_PRODUCT_FAILURE });
  }
}

function* updateTierPrice(action: UpdateTierPriceAction) {
  try {
    yield call(api, `/product/${action.productId}/tierprice`, {
      method: "PUT",
      data: action.tierPrices,
    });
    yield put({ type: UPDATE_TIER_PRICE_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_TIER_PRICE_FAILURE });
  }
}

function* addAttribute(action) {
  try {
    const attribute: AddAttributeInterface = action.attribute;
    yield call(api, "/attribute", {
      method: "POST",
      data: {
        ...action.attribute,
        associatedCategoryIds: attribute.associatedCategories.map(
          (category) => category.value
        ),
      },
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

function* updateAllProductsStatus(action) {
  try {
    yield call(api, "/product/sku/status", {
      method: "PUT",
      data: {
        disableAll: !action.productStatus,
      },
    });
    yield put({ type: UPDATE_ALL_PRODUCTS_STATUS_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_ALL_PRODUCTS_STATUS_FAILURE });
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
function* watchCloneProduct() {
  yield takeEvery(CLONE_PRODUCT_REQUEST, cloneProduct);
}

function* watchUpdateTierPrice() {
  yield takeEvery(UPDATE_TIER_PRICE_REQUEST, updateTierPrice);
}

function* watchUpdateAllProductsStatus() {
  yield takeEvery(UPDATE_ALL_PRODUCTS_STATUS_REQUEST, updateAllProductsStatus);
}

export default function* () {
  yield all([
    watchAddProduct(),
    watchAddAttribute(),
    watchAddAttributeValue(),
    watchCloneProduct(),
    watchUpdateTierPrice(),
    watchUpdateAllProductsStatus(),
  ]);
}
