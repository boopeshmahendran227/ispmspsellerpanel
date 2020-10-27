import RelativeImg from "./RelativeImg";
import { ProductDetailSkuDetail } from "types/product";
import Link from "next/link";
import { AttributeValueID } from "types/sku";
import { Flex, Box, Button } from "@chakra-ui/core";

interface OtherSkuMiniProps {
  productId: number;
  sku: ProductDetailSkuDetail;
}

const OtherSkuMini = (props: OtherSkuMiniProps): JSX.Element => {
  const { productId, sku } = props;

  return (
    <Flex p="0.8em 0" justify="space-between">
      <Flex mt="0.2em">
        <Box w="60px" h="80px" textAlign="center" mr="0.2em">
          <RelativeImg src={sku.imageRelativePaths[0]} />
        </Box>
        <Box>
          <Box fontWeight="bold">{sku.skuId}</Box>
          <Box mt="0.4em" color="secondaryTextColor">
            {sku.attributeValueIds.map((attributeValueId: AttributeValueID) => (
              <Box mt="0.2em" key={attributeValueId.attributeId}>
                {attributeValueId.attributeName + ": " + attributeValueId.value}
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
      <Box>
        <Link
          href={`/product/[id]/sku/new?copySkuId=${sku.skuId}`}
          as={`/product/${productId}/sku/new?copySkuId=${sku.skuId}`}
        >
          <Button variantColor="primaryColorVariant">
            Add to Your Variants
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default OtherSkuMini;
