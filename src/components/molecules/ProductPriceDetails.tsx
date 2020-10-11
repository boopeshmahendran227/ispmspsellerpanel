import { formatPrice } from "utils/misc";
import SectionHeader from "../atoms/SectionHeader";
import SectionCard from "../atoms/SectionCard";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { Grid, Box } from "@chakra-ui/core";

interface ProductPriceDetailsProps {
  minPrice: number;
  maxPrice: number;
}

const ProductPriceDetails = (props: ProductPriceDetailsProps): JSX.Element => {
  const { minPrice, maxPrice } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Price Details</SectionHeader>
      </SectionHeaderContainer>
      <Grid templateColumns="200px 1fr" gap={2}>
        <Box fontWeight="bold">Min Price</Box>
        <Box>{formatPrice(minPrice)}</Box>
        <Box fontWeight="bold">Max Price</Box>
        <Box>{formatPrice(maxPrice)}</Box>
      </Grid>
    </SectionCard>
  );
};

export default ProductPriceDetails;
