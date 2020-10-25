import RelativeImg from "./RelativeImg";
import { Fragment } from "react";
import { Flex, Grid, Box, Heading } from "@chakra-ui/core";

interface MetaInfo {
  key: string;
  value: string | Number;
}

interface ProductCardProps {
  name: string;
  image: string;
  metaInfo?: MetaInfo[];
}

const ProductCard = (props: ProductCardProps) => {
  const { metaInfo } = props;

  return (
    <Flex textAlign="initial">
      <Box w={["4rem", "5rem"]} textAlign="center" p={1} pl="0">
        <RelativeImg src={props.image}></RelativeImg>
      </Box>
      <Box>
        <Heading
          fontWeight="semibold"
          fontSize={["sm", null, "md"]}
          maxW={["100px", "150px", "250px"]}
          color="primaryTextColor"
        >
          {props.name}
        </Heading>
        <Grid
          mt={1}
          color="secondaryTextColor"
          fontSize={["xs", null, null, "sm"]}
          templateColumns="90px 1fr"
          gridRowGap={1}
        >
          {Array.isArray(metaInfo) &&
            metaInfo.map((obj, index) => (
              <Fragment key={index}>
                <Box as="span" fontWeight="bold">
                  {obj.key}:{" "}
                </Box>
                <Box as="span">{obj.value}</Box>
              </Fragment>
            ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default ProductCard;
