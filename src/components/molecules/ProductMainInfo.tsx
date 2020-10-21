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
      <Grid templateColumns="200px 1fr" gap={2}>
        <Box fontWeight="bold">Name</Box>
        <Box>{name}</Box>
        <Box fontWeight="bold">Brand</Box>
        <Box>{brand}</Box>
        <Box fontWeight="bold">Short Description</Box>
        <Box>{shortDescription}</Box>
        <Box fontWeight="bold">Long Description</Box>
        <Box>{longDescription}</Box>
      </Grid>
    </SectionCard>
  );
};

export default ProductMainInfo;
