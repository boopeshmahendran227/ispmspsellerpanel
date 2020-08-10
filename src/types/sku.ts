export interface EditSkuInterface {
  productId: number;
  skuId: string;
  price: number;
  boughtPrice: number;
  qty: number;
  ecosystemIds: string[];
  attributeValueIds: AttributeValueID[];
  imageRelativePaths: string[];
  externalId: string;
  barcodeIdentifier: string;
  length: number;
  height: number;
  width: number;
  weight: number;
}

interface AttributeValueID {
  attributeId: number;
  valueId: number;
  attributeName: string;
  value: string;
}
