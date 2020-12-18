import Link from "next/link";
import { formatPrice } from "utils/misc";
import RelativeImg from "../atoms/RelativeImg";
import { ProductDetailSkuDetail } from "types/product";
import { AttributeValueID } from "types/sku";
import { Flex, Box } from "@chakra-ui/core";
import Button from "components/atoms/Button";

interface YourSkuMiniProps {
  productId: number;
  sku: ProductDetailSkuDetail;
}

const YourSkuMini = (props: YourSkuMiniProps): JSX.Element => {
  const { sku } = props;

  return (
    <Link
      href="/product/[id]/sku/[skuId]"
      as={`/product/${props.productId}/sku/${sku.skuId}`}
    >
      <Flex
        justify="space-between"
        cursor="pointer"
        borderBottom="1px solid #f0f0f0"
        w="full"
        p={3}
      >
        <Box>
          <Flex>
            <Box w="80px" h="80px" p={2}>
              <RelativeImg src={sku.imageRelativePaths[0]} />
            </Box>
            <Box>
              <Box fontWeight="bold" fontSize={["sm", "md"]}>
                {sku.skuId}
              </Box>
              <Box
                fontSize={["xs", "sm", "md"]}
                mt={1}
                color="secondaryTextColor.500"
              >
                {sku.attributeValueIds.map(
                  (attributeValueId: AttributeValueID, index) => (
                    <Box mt={1} key={index}>
                      {attributeValueId.attributeName +
                        ": " +
                        attributeValueId.value}
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box w="80px" fontSize={["sm", "md"]} textAlign="right">
          <Box>{formatPrice(sku.price)}</Box>
          <Box color="secondaryTextColor.500">Qty: {sku.qty}</Box>
          <Button onClick={() => null}>Edit</Button>
        </Box>
      </Flex>
    </Link>
  );
};

export default YourSkuMini;
