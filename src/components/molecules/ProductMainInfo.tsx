import SectionHeader from "../atoms/SectionHeader";
import SectionCard from "../atoms/SectionCard";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { Box, Grid } from "@chakra-ui/core";

interface ProductMainInfoProps {
  name: string;
  brand: string;
  shortDescription: string;
  longDescription: string;
}

const ProductMainInfo = (props: ProductMainInfoProps): JSX.Element => {
  const { name, brand, shortDescription, longDescription } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Main Details</SectionHeader>
      </SectionHeaderContainer>
      <Grid
        templateColumns={["150px 1fr", "200px 1fr"]}
        gap={[1, 2]}
        fontSize={["sm", "md"]}
      >
        <Box fontWeight="bold">Name</Box>
        <Box>{name}</Box>
        <Box fontWeight="bold">Brand</Box>
        <Box>{brand}</Box>
        <Box fontWeight="bold">Short Description</Box>
        <Box>{shortDescription}</Box>
        <Box fontWeight="bold">Long Description</Box>
        <Box wordBreak="break-all">{longDescription}</Box>
      </Grid>
    </SectionCard>
  );
};

export default ProductMainInfo;
