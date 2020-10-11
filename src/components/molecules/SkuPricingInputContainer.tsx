import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldPriceInput from "components/atoms/FieldPriceInput";
import { Grid, Box, FormLabel } from "@chakra-ui/core";

const SkuPricingInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Pricing</SectionHeader>
      <Grid templateColumns="1fr 1fr" gap={2}>
        <Box>
          <FormLabel>Price</FormLabel>
          <FieldPriceInput name="price" />
        </Box>
        <Box>
          <FormLabel>Bought Price</FormLabel>
          <FieldPriceInput name="boughtPrice" />
        </Box>
      </Grid>
    </SectionCard>
  );
};

export default SkuPricingInputContainer;
