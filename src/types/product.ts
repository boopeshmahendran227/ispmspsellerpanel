import * as Yup from "yup";

export const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .nullable(),
  brand: Yup.string()
    .required()
    .nullable(),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required(),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required(),
  sku: Yup.string().required("Unit is a required field"),
  productCategoryId: Yup.string().required()
});
