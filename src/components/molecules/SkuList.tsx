import RelativeImg from "components/atoms/RelativeImg";
import Link from "next/link";
import { ProductDetailSkuDetail } from "types/product";
import { Box, Heading, Flex } from "@chakra-ui/core";

interface SkuListProps {
  productId: number;
  skus: ProductDetailSkuDetail[];
  currentSkuId?: string;
}

const SkuList = (props: SkuListProps): JSX.Element | null => {
  const { productId, skus } = props;

  if (skus.length === 0) {
    return null;
  }

  return (
    <Box
      w={["100%", null, "300px"]}
      bg="foregroundColor.500"
      my={3}
      border="1px"
      borderColor="borderColor.500"
    >
      <Heading size="md" bg="hoverColor.500" py={2} px={1}>
        Your Variants
      </Heading>
      <Box maxH="300px" overflowY="auto">
        {skus.map((sku) => (
          <Link
            key={sku.skuId}
            href="/product/[id]/sku/[skuId]"
            as={`/product/${productId}/sku/${sku.skuId}`}
          >
            <Flex
              p={1}
              borderTop="1px"
              borderTopColor="borderColor.500"
              cursor="pointer"
              transition="all 0.3s"
              bg={props.currentSkuId === sku.skuId ? "secondaryColor.500" : ""}
              color={props.currentSkuId === sku.skuId ? "white" : ""}
            >
              <Box w="50px" h="50px" m={1}>
                <RelativeImg src={sku.imageRelativePaths[0]} />
              </Box>
              {sku.skuId}
            </Flex>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default SkuList;
