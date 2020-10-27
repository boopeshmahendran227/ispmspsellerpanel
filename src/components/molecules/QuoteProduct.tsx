import { ProductDetailQuoteInterface } from "../../types/quote";
import { formatPrice } from "utils/misc";
import ProductCard from "../atoms/ProductCard";
import { Flex, Box, Stack, Grid } from "@chakra-ui/core";

interface QuoteProductProps {
  productDetail: ProductDetailQuoteInterface;
}

const QuoteProduct = (props: QuoteProductProps) => {
  const { productDetail } = props;

  return (
    <Grid
      m={1}
      p={1}
      gridTemplateColumns={["1fr", "1fr 0.5fr 0.5fr"]}
      gap={[2, 3]}
    >
      <Box>
        <ProductCard
          name={productDetail.productDetails.name}
          image={productDetail.productDetails.imageRelativePaths[0]}
          metaInfo={[
            ...productDetail.productDetails.attributeValueIds.map(
              (attributeValue) => ({
                key: attributeValue.attributeName,
                value: attributeValue.value,
              })
            ),
            {
              key: "Product Id",
              value: productDetail.productId,
            },
            {
              key: "Sku Id",
              value: productDetail.skuId,
            },
            {
              key: "Original Price",
              value: `${formatPrice(productDetail.productDetails.skuPrice)} x
                      ${productDetail.qty} = ${formatPrice(
                productDetail.productDetails.skuPrice * productDetail.qty
              )}`,
            },
            {
              key: "Qty",
              value: productDetail.qty,
            },
          ]}
        />
      </Box>
      <Box fontSize={["sm"]} lineHeight="1.4" textAlign={["center", "left"]}>
        <Box fontSize={["md"]} color="warningColor">
          Requested Quote
        </Box>
        <Box>
          {formatPrice(productDetail.price / productDetail.qty)} x{" "}
          {productDetail.qty} = {formatPrice(productDetail.price)}
        </Box>
      </Box>
      <Box fontSize={["sm"]} lineHeight="1.4" textAlign={["center", "left"]}>
        <Box fontSize={["md"]} color="successColor">
          Responded Quote
        </Box>
        <Box>
          {productDetail.updatedQuote ? (
            <Box>
              {formatPrice(
                productDetail.updatedQuote.totalDiscountedPrice /
                  productDetail.qty
              )}{" "}
              x {productDetail.qty} ={" "}
              {formatPrice(productDetail.updatedQuote.totalDiscountedPrice)}
            </Box>
          ) : (
            <Box>Not yet Responded</Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default QuoteProduct;
