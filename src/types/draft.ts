import {
  ProductMiniInterface,
  ProductType,
  TierPriceInterface,
  SpecificationInterface,
  FAQInterface,
  ProductSkuDetail,
} from "./product";

export interface DraftMiniInterface extends ProductMiniInterface {
  status: string;
}

export interface DraftResponseInterface {
  id: number;
  name: string;
  brandName: string;
  shortDescription: string;
  longDescription: string;
  specialDiscount: number;
  minPrice: number;
  maxPrice: number;
  productType: ProductType;
  tierPrice: TierPriceInterface[];
  specification: SpecificationInterface;
  faqs: FAQInterface[];
  skuDetails: ProductSkuDetail[];
  attributeValues: DraftAttributeValuesInterface[];
  status: string;
}

export interface DraftAttributeValuesInterface {
  attributeId: number;
  valueId: number;
  attributeName: string;
  value: string;
}
