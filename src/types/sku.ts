import { UPDATE_SKU_REQUEST, ADD_SKU_REQUEST } from "src/constants/ActionTypes";

export interface AddSkuAction {
  type: typeof ADD_SKU_REQUEST;
  sku: AddSkuInterface;
}

export interface UpdateSkuAction {
  type: typeof UPDATE_SKU_REQUEST;
  sku: UpdateSkuInterface;
}

export type SkuActionType = AddSkuAction | UpdateSkuAction;

export interface AddSkuInterface {
  productId: number;
  price: number;
  boughtPrice: number;
  qty: number;
  ecosystemIds?: string[] | undefined; // Todo: Fix this type
  attributeValueIds: AttributeValueID[];
  imageRelativePaths: string[];
  externalId: string | null;
  barcodeIdentifier?: string | null;
  length: number | null;
  height: number | null;
  width: number | null;
  weight: number | null;
}

export interface AttributeValueID {
  attributeId: number;
  valueId: number;
  attributeName: string;
  value: string;
}

export interface UpdateSkuInterface {
  skuDetailId: number;
  price: number;
  boughtPrice: number;
  qty: number;
  ecosystemIds?: string[] | undefined; // Todo: Fix this type
  externalId: string | null;
  barcodeIdentifier: string | null;
  length: number | null;
  height: number | null;
  width: number | null;
  weight: number | null;
}
