import SectionCard from "../atoms/SectionCard";
import SectionHeader from "../atoms/SectionHeader";
import FieldNumInput from "../atoms/FieldNumInput";
import FieldInput from "../atoms/FieldInput";
import { FormLabel, Grid, Box } from "@chakra-ui/core";

const SkuInventoryInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Inventory</SectionHeader>
      <Grid templateColumns="1fr 1fr" gridGap="1em">
        <Box>
          <FormLabel>Qty</FormLabel>
          <FieldNumInput name="qty" />
        </Box>
        <Box>
          <FormLabel>Minimum Order Quantity</FormLabel>
          <FieldNumInput name="minOrderQty" />
        </Box>
        <Box>
          <FormLabel>Bar Code</FormLabel>
          <FieldInput name="barCode" />
        </Box>
        <Box>
          <FormLabel>External Id</FormLabel>
          <FieldInput name="externalId" />
        </Box>
      </Grid>
    </SectionCard>
  );
};

export default SkuInventoryInputContainer;
