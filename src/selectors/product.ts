import { createSelector } from "reselect";
import { RootState } from "../reducers";
import _ from "lodash";
import {
  SelectedAttribute,
  SelectedAttributeValuesMap,
  ProductSkuDetail,
  AttributeValueInterface,
  ProductAttributeValueId,
} from "../types/product";

const getSelectedAttributes = createSelector(
  (state: RootState) => state.product,
  (product): SelectedAttribute[] => product.selectedAttributes
);

const getSelectedAttributeValues = createSelector(
  (state: RootState) => state.product,
  (product): SelectedAttributeValuesMap => product.selectedAttributeValues
);

const getSkus = createSelector(
  getSelectedAttributeValues,
  getSelectedAttributes,
  (selectedAttributeValues, selectedAttributes): ProductSkuDetail[] => {
    // Return empty array for values if attribute id not present in the map
    const results: ProductAttributeValueId[][] = [];
    getAttributeValueCombinations(
      selectedAttributeValues,
      selectedAttributes,
      0,
      [],
      results
    );

    return results.map(
      (attributeValueIds: ProductAttributeValueId[], index) => {
        return {
          skuId: "SKU" + (index + 1).toString(),
          price: 0,
          boughtPrice: 0,
          qty: 0,
          attributeValueIds,
          imageRelativePaths: [],
          images: [],
          length: null,
          width: null,
          height: null,
          weight: null,
          barCodeIdentifier: null,
          externalId: null,
          specialDiscount: 0,
          specialDiscountPercentage: 0,
        };
      }
    );
  }
);

const getAttributeValueCombinations = (
  attributeValuesMap: SelectedAttributeValuesMap,
  selectedAttributes: SelectedAttribute[],
  index: number,
  currentAttributeValueIds: ProductAttributeValueId[],
  results: ProductAttributeValueId[][]
) => {
  const attributeIds = Object.keys(attributeValuesMap);
  const attributeId = attributeIds[index];

  if (attributeIds.length === 0) {
    return [];
  }

  attributeValuesMap[attributeId].forEach((value: AttributeValueInterface) => {
    currentAttributeValueIds[index] = {
      attributeId: Number(attributeId),
      attributeName:
        selectedAttributes.find(
          (attribute) => attribute.attributeId === Number(attributeId)
        )?.attributeName || "",
      value: value.value,
      valueId: value.id,
    };

    if (index + 1 < attributeIds.length) {
      getAttributeValueCombinations(
        attributeValuesMap,
        selectedAttributes,
        index + 1,
        currentAttributeValueIds,
        results
      );
    } else {
      const res = JSON.parse(JSON.stringify(currentAttributeValueIds));
      results.push(res);
    }
  });
};

export { getSelectedAttributes, getSelectedAttributeValues, getSkus };
