import * as Yup from "yup";

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

enum AttributeType {
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
