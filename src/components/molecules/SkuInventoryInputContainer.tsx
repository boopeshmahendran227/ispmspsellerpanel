import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldNumInput from "components/atoms/FieldNumInput";
import FieldInput from "components/atoms/FieldInput";
import { Grid, Box, FormLabel } from "@chakra-ui/core";

const SkuInventoryInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Inventory</SectionHeader>
      <Grid templateColumns="1fr 1fr" gap="1em">
        <Box>
          <FormLabel>Qty</FormLabel>
          <FieldNumInput name="qty" />
        </Box>
        <Box>
          <FormLabel>Bar Code</FormLabel>
          <FieldInput name="barCode" />
        </Box>
        <Box>
          <label>External Id</label>
          <FieldInput name="externalId" />
        </Box>
      </Grid>
    </SectionCard>
  );
};

export default SkuInventoryInputContainer;
