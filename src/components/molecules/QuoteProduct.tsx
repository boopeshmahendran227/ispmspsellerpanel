import { ProductDetailQuoteInterface } from "../../types/quote";
import { formatPrice } from "utils/misc";
import ProductCard from "../atoms/ProductCard";
import { Flex, Box,Stack } from "@chakra-ui/core";

interface QuoteProductProps {
  productDetail: ProductDetailQuoteInterface;
}

const QuoteProduct = (props: QuoteProductProps) => {
  const { productDetail } = props;

  return (
    <Flex m="0.5em" p="0.5em" justify="space-between">
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
      <Box fontSize="0.9rem" lineHeight="1.4">
        <Box fontSize="1.1rem" color="warningColor">
          Requested Quote
        </Box>
        <Box>
          {formatPrice(productDetail.price / productDetail.qty)} x{" "}
          {productDetail.qty} = {formatPrice(productDetail.price)}
        </Box>
      </Box>
      <Box fontSize="0.9rem" lineHeight="1.4">
        <Box fontSize="1.1rem" color="successColor">
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
    </Flex>
  );
};

export default QuoteProduct;
