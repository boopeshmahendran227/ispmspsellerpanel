import * as Yup from "yup";
import {
  ADD_ATTRIBUTE_REQUEST,
  SET_SELECTED_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTE_VALUES_MAP,
  ADD_ATTRIBUTE_VALUE_REQUEST,
  ADD_PRODUCT_REQUEST,
  INIT_PRODUCT_CREATE,
} from "../constants/ActionTypes";

interface AddAttributeAction {
  type: typeof ADD_ATTRIBUTE_REQUEST;
  attribute: AddAttributeInterface;
}

interface AddAttributeValueAction {
  type: typeof ADD_ATTRIBUTE_VALUE_REQUEST;
  attributeId: number;
  value: string;
}

interface SetSelectedAttributeAction {
  type: typeof SET_SELECTED_ATTRIBUTES;
  attributes: SelectedAttribute[];
}

interface SetSelectedAttributeValuesAction {
  type: typeof SET_SELECTED_ATTRIBUTE_VALUES_MAP;
  value: SelectedAttributeValuesMap;
}

interface AddProductAction {
  type: typeof ADD_PRODUCT_REQUEST;
  product: ProductInputInterface;
}

interface InitProductCreateAction {
  type: typeof INIT_PRODUCT_CREATE;
}

export type ProductActionType =
  | InitProductCreateAction
  | AddAttributeAction
  | AddAttributeValueAction
  | SetSelectedAttributeAction
  | SetSelectedAttributeValuesAction
  | AddProductAction;

export interface ProductInputInterface {
  name: string;
  isActive: boolean;
  shortDescription: string;
  longDescription: string;
  specialDiscountValue: number;
  minPrice: number;
  maxPrice: number;
  brand: SelectOptionInterface | null;
  countryOfOrigin: SelectOptionInterface | null;
  tierPrices: TierPriceInterface[];
  faqs: FAQInterface[];
  categories: SelectOptionInterface[];
  defaultCategory: SelectOptionInterface | null;
  specification: SpecificationInterface;
  skus: ProductSkuDetail[];
  taxGroup: SelectOptionInterface | null;
  ecosystems: SelectOptionInterface[];
}

export interface EcosystemDetailInterface {
  id: string;
  name: string;
}

export interface ProductDetailInterface {
  id: number;
  visibilityInfo: {
    ecosystemDetail: EcosystemDetailInterface[];
  };
  name: string;
  shortDescription: string;
  longDescription: string;
  brandName: string;
  minPrice: number;
  maxPrice: number;
  productType: ProductType;
  specialDiscount: number;
  attributeValues: ProductAttributeInterface[];
  skuDetails: ProductDetailSkuDetail[];
  unOwnedSkuDetails: ProductDetailSkuDetail[];
  specification: SpecificationInterface;
  tierPrice: TierPriceInterface[];
  faqs: FAQInterface[];
}

export interface ProductDetailSkuDetail {
  skuDetailId: number;
  ecosystemIds: string[];
  skuId: string;
  sellerId: string;
  sellerName: string;
  attributeValueIds: ProductAttributeValue[];
  price: number;
  boughtPrice: number;
  qty: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  imageRelativePaths: string[];
  externalId: string;
  barCodeIdentifier: string;
}

interface ProductAttributeInterface {
  attributeId: number;
  attributeName: string;
  attributeType: AttributeType;
  attributeValues: AttributeValue[];
}

interface AttributeValue {
  valueId: number;
  value: string;
}

export interface SelectOptionInterface {
  value: number | string;
  label: React.ReactNode;
}

export interface ProductAttributeValue {
  attributeId: number;
  valueId: number;
  attributeName: string;
  value: string;
}

export interface BrandInterface {
  id: number;
  name: string;
}

export enum AttributeType {
  Default = "Default",
  Color = "Color",
  Warranty = "Warranty",
}

export enum ProductType {
  Simple = "Simple",
  Configurable = "Configurable",
  Virtual = "Virtual",
}

export interface AttributeValueInterface {
  id: number;
  value: string;
}

export interface AttributeInterface {
  id: number;
  description: string;
  name: string;
  attributeType: AttributeType;
  values: AttributeValueInterface[];
  associatedCategoryIds: number[];
}

export interface AddAttributeInterface {
  name: string;
  description: string;
  attributeType: AttributeType;
  values: string[];
  associatedCategories: SelectOptionInterface[];
}

export interface ProductMiniInterface {
  productId: number;
  productName: string;
  productShortDescription: string;
  productImages: string[];
  isActive: boolean;
}

export interface SelectedAttribute {
  attributeId: number;
  attributeName: string;
}

export interface SelectedAttributeValuesMap {
  [key: number]: AttributeValueInterface[];
}

export interface ProductSkuDetail {
  skuId: string;
  price: number;
  boughtPrice: number;
  qty: number;
  attributeValueIds: ProductAttributeValueId[];
  imageRelativePaths: string[];
  length: string;
  width: string;
  height: string;
  weight: string;
  barCodeIdentifier: string;
  externalId: string;
}

export interface ProductAttributeValueId {
  attributeId: number;
  valueId: number;
  attributeName: string;
  value: string;
}

export interface TierPriceInterface {
  minQty: number;
  discountPercentage: number;
}

export interface FAQInterface {
  question: string;
  answer: string;
}

export interface SpecificationItem {
  key: string;
  value: string;
}

export interface SpecificationItemGroup {
  name: string;
  items: SpecificationItem[];
}

export interface SpecificationInterface {
  itemGroups: SpecificationItemGroup[];
}

export interface TaxGroupInterface {
  id: number;
  name: string;
  description: string;
}

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string().max(250).required(),
  longDescription: Yup.string().min(20).max(1000).required(),
  brand: Yup.object().required("Brand is required").nullable(),
  countryOfOrigin: Yup.object()
    .required("Country of origin is required")
    .nullable(),
  defaultCategory: Yup.object()
    .required("Default Category is required")
    .nullable(),
  specialDiscountValue: Yup.number()
    .typeError("Special discount value must be a number")
    .required(),
  minPrice: Yup.number()
    .typeError("Min price must be a number")
    .positive("Min price must be greater than 0")
    .required(),
  maxPrice: Yup.number()
    .typeError("Max price must be a number")
    .positive("Max price must be greater than 0")
    .required()
    .moreThan(Yup.ref("minPrice"), "Max price must be greater than min price"),
  skus: Yup.array()
    .of(
      Yup.object().shape({
        skuId: Yup.string().required(),
        price: Yup.number()
          .typeError("Price must be a number")
          .positive("Price must be greater than 0")
          .required(),
        boughtPrice: Yup.number()
          .typeError("Bought Price must be a number")
          .positive("Bought Price must be greater than 0")
          .required(),
        qty: Yup.number()
          .typeError("Qty must be a number")
          .positive("Qty must be greater than 0")
          .required(),
        length: Yup.string(),
        width: Yup.string(),
        height: Yup.string(),
        weight: Yup.string(),
        barCodeIdentifier: Yup.string(),
        externalId: Yup.string(),
        imageRelativePaths: Yup.array()
          .of(Yup.string())
          .min(1, "Each sku should contain atleast one image"),
      })
    )
    .min(1, "Atlease one sku is required"),
  tierPrices: Yup.array().of(
    Yup.object().shape({
      minQty: Yup.number("Minimum Qty must be a number").positive(
        "Minimum Qty must be lesser than 0"
      ),
      discountPercentage: Yup.number()
        .min(1, "Discount Percentage must be greater than 1")
        .max(100, "Discount Percentage should be less than 100"),
    })
  ),
  faqs: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer: Yup.string().required("Answer is required"),
    })
  ),
  taxGroup: Yup.object().required("Tax group is required").nullable(),
  specification: Yup.object().shape({
    itemGroups: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(),
          items: Yup.array()
            .of(
              Yup.object().shape({
                key: Yup.string().required(),
                value: Yup.string().required(),
              })
            )
            .min(1, "Atleast one specification item is required"),
        })
      )
      .min(1, "Atleast one specification item group is required"),
  }),
  ecosystems: Yup.array().of(Yup.object()).min(1),
});
