import RelativeImg from "./RelativeImg";
import Link from "next/link";
import Card from "./Card";
import { Box, Flex, Heading, Link as ChakraLink } from "@chakra-ui/core";

interface SkuProductInfoProps {
  productId: number;
  productName: string;
  image: string;
}

const SkuProductInfo = (props: SkuProductInfoProps): JSX.Element => {
  const { productId, productName, image } = props;

  return (
    <Box w="300px">
      <Card>
        <Flex>
          <Box w="50px" h="50px" m="1em">
            <RelativeImg src={image} />
          </Box>
          <Box>
            <Heading size="md">{productName}</Heading>
            <Box>
              <Link href="/product/[id]" as={`/product/${productId}`}>
                <ChakraLink
                  display="inline-block"
                  m="0.6em 0"
                  color="secondaryColor"
                  textDecoration="none"
                >
                  Back to product
                </ChakraLink>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default SkuProductInfo;
