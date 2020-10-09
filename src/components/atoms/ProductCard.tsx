import RelativeImg from "./RelativeImg";
import { Fragment } from "react";
import { Flex, Grid, Box, Text, Heading } from "@chakra-ui/core";

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
      <Box w="5rem" textAlign="center" p="0.5em" pl="0">
        <RelativeImg src={props.image}></RelativeImg>
      </Box>
      <Box>
        <Heading
          fontWeight="semibold"
          fontSize="md"
          maxW="150px"
          color="primaryTextColor"
        >
          {props.name}
        </Heading>
        <Grid
          mt="0.5em"
          color="secondaryTextColor"
          fontSize="0.9rem"
          templateColumns="80px 1fr"
          gridRowGap="0.1em"
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
