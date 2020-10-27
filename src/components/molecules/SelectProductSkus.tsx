import { FieldArray, useFormikContext, ErrorMessage } from "formik";
import InputLabel from "../atoms/InputLabel";
import FieldInput from "../atoms/FieldInput";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import {
  CouponInputInterface,
  CouponProductInputInterface,
} from "../../types/coupon";
import FieldNumInput from "../atoms/FieldNumInput";
import { Grid, Box, Heading, Button } from "@chakra-ui/core";

const SelectProductSkus = () => {
  const values: CouponInputInterface = useFormikContext<CouponInputInterface>()
    .values;

  // const products: CouponProductInputInterface[] = values.products;
  const products: CouponProductInputInterface[] = [];

  const handleAddProduct = (arrayHelpers) => {
    arrayHelpers.push({
      productId: 0,
      skuIds: [],
    });
  };

  const handleAddSku = (arrayHelpers) => {
    arrayHelpers.push("");
  };

  const handleDeleteSku = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  const handleDeleteProduct = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  return (
    <Box my={1}>
      <Heading size="md" p={1} mb={2}>
        Products
      </Heading>
      <FieldArray
        name="products"
        render={(arrayHelpers) => (
          <Box className="inputContainer">
            {products.length > 0 &&
              products.map((product, productIndex) => (
                <Box m="1em 5em">
                  <Grid
                    templateColumns="200px 200px 100px"
                    alignItems="center"
                    fontSize="md"
                  >
                    <InputLabel label="Product Id" />
                    <FieldNumInput
                      name={`products.${productIndex}.productId`}
                    />
                    <Button
                      variantColor="primaryColorVariant"
                      type="button"
                      onClick={() =>
                        handleDeleteProduct(arrayHelpers, productIndex)
                      }
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </Button>
                  </Grid>
                  <FieldArray
                    name={`products.${productIndex}.skuIds`}
                    render={(arrayHelpers) => (
                      <>
                        {product.skuIds.length > 0 && (
                          <table>
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Sku Id</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.skuIds.map((skuId, skuIndex) => (
                                <tr>
                                  <td>{skuIndex + 1}</td>
                                  <td>
                                    <FieldInput
                                      name={`products.${productIndex}.skuIds.${skuIndex}`}
                                    />
                                  </td>
                                  <td>
                                    <Button
                                      variantColor="primaryColorVariant"
                                      type="button"
                                      onClick={() =>
                                        handleDeleteSku(arrayHelpers, skuIndex)
                                      }
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        <Box>
                          <Button
                            variantColor="primaryColorVariant"
                            onClick={() => handleAddSku(arrayHelpers)}
                          >
                            {product.skuIds.length === 0
                              ? "Add SKUs"
                              : "Add one more SKU"}
                          </Button>
                        </Box>
                      </>
                    )}
                  />
                  <ErrorMessage
                    component={ValidationErrorMsg}
                    name={`products.${productIndex}.skuIds`}
                  />
                </Box>
              ))}
            <Box>
              <Button
                variantColor="primaryColorVariant"
                onClick={() => handleAddProduct(arrayHelpers)}
              >
                {products.length === 0 ? "Add Product" : "Add one more Product"}
              </Button>
            </Box>
          </Box>
        )}
      />
      <ErrorMessage component={ValidationErrorMsg} name={`products`} />
    </Box>
  );
};

export default SelectProductSkus;
