import * as Yup from "yup";
import {
  ADD_ATTRIBUTE_REQUEST,
  SET_SELECTED_ATTRIBUTES,
  SET_SELECTED_ATTRIBUTE_VALUES,
} from "../constants/ActionTypes";

interface AddAttributeAction {
  type: typeof ADD_ATTRIBUTE_REQUEST;
  attribute: AddAttributeInterface;
}

interface SetSelectedAttributeAction {
  type: typeof SET_SELECTED_ATTRIBUTES;
  attributes: SelectedAttribute[];
}

interface SetSelectedAttributeValuesAction {
  type: typeof SET_SELECTED_ATTRIBUTE_VALUES;
  attributeId: number;
  values: AttributeValueInterface[];
}

export type ProductActionType =
  | AddAttributeAction
  | SetSelectedAttributeAction
  | SetSelectedAttributeValuesAction;

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
}

export interface AddAttributeInterface {
  name: string;
  description: string;
  attributeType: AttributeType;
  values: string[];
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
  name: string;
  itemGroups: SpecificationItemGroup[];
}

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string().required(),
  longDescription: Yup.string().required(),
  brand: Yup.object().required(),
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
});
