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

export interface SelectedAttribute {
  attributeId: number;
  attributeName: string;
}

export interface SelectedAttributeValuesMap {
  [key: number]: AttributeValueInterface[];
}

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required().nullable(),
  brand: Yup.string().required().nullable(),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required(),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required(),
  sku: Yup.string().required("Unit is a required field"),
  productCategoryId: Yup.string().required(),
});
