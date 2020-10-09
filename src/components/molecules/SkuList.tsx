import RelativeImg from "components/atoms/RelativeImg";
import CSSConstants from "src/constants/CSSConstants";
import Link from "next/link";
import classNames from "classnames";
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
      w="300px"
      bg="foregroundColor"
      m="1em 0"
      border="1px"
      borderColor="borderColor"
    >
      <Heading size="lg" bg="hoverColor" p="1.1em 0.9em">
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
              p="0.5em"
              borderTop="1px"
              borderTopColor="borderColor"
              cursor="pointer"
              transition="all 0.3s"
              bg={props.currentSkuId === sku.skuId ? "secondaryColor" : ""}
              color={props.currentSkuId === sku.skuId ? "white" : ""}
            >
              <Box w="50px" h="50px" m="0.3em">
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
