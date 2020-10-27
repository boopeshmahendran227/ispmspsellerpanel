import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldPriceInput from "components/atoms/FieldPriceInput";
import { SimpleGrid, Box, FormLabel } from "@chakra-ui/core";

const SkuPricingInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Pricing</SectionHeader>
      <SimpleGrid columns={2} spacing={2}>
        <Box>
          <FormLabel>Price</FormLabel>
          <FieldPriceInput name="price" />
        </Box>
        <Box>
          <FormLabel>Bought Price</FormLabel>
          <FieldPriceInput name="boughtPrice" />
        </Box>
      </SimpleGrid>
    </SectionCard>
  );
};

export default SkuPricingInputContainer;
