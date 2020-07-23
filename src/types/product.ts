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
  shortDescription: string;
  longDescription: string;
  specialDiscountValue: number;
  minPrice: number;
  maxPrice: number;
  brand: SelectOptionInterface;
  tierPrices: TierPriceInterface[];
  faqs: FAQInterface[];
  categories: SelectOptionInterface[];
  defaultCategory: SelectOptionInterface;
  specification: SpecificationInterface;
  skus: ProductSkuDetail[];
  taxGroup: SelectOptionInterface;
  ecosystems: SelectOptionInterface[];
}

export interface ProductResponseInterface {
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
  attributeValues: ResponseAttributeValuesInterface[];
}

export interface ResponseAttributeValuesInterface {
  attributeId: number;
  valueId: number;
  attributeName: string;
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
  id: number;
  imageRelativePaths: string[];
  name: string;
  averageRating: number;
  shortDescription: string;
  price: number;
  specialDiscount: number;
  isBundle: boolean;
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
  desscription: string;
}

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string().required(),
  longDescription: Yup.string().min(20).required(),
  brand: Yup.object().required("Brand is required").nullable(),
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
    .required(),
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
