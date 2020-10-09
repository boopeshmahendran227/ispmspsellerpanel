import Link from "next/link";
import { formatPrice } from "utils/misc";
import RelativeImg from "../atoms/RelativeImg";
import { ProductDetailSkuDetail } from "types/product";
import { AttributeValueID } from "types/sku";
import { Flex, Box,Button } from "@chakra-ui/core";

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
        p="0.8em"
        justify="space-between"
        cursor="pointer"
        borderBottom="1px solid #f0f0f0"
      >
        <Flex>
          <Box w="80px" h="80px" m="0.4em" p="0.3em">
            <RelativeImg src={sku.imageRelativePaths[0]} />
          </Box>
          <Box>
            <Box fontWeight="bold">{sku.skuId}</Box>
            <Box mt="0.4em" color="secondaryTextColor">
              {sku.attributeValueIds.map(
                (attributeValueId: AttributeValueID) => (
                  <Box mt="0.2em">
                    {attributeValueId.attributeName +
                      ": " +
                      attributeValueId.value}
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Flex>
        <Box w="80px">
          <Box fontSize="1.1rem">{formatPrice(sku.price)}</Box>
          <Box color="secondaryTextColor">Qty: {sku.qty}</Box>
          <Button variantColor="primaryColorVariant" onClick={() => null}>Edit</Button>
        </Box>
      </Flex>
    </Link>
  );
};

export default YourSkuMini;
