import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldNumInput from "components/atoms/FieldNumInput";
import { Box, SimpleGrid, FormLabel } from "@chakra-ui/core";

const SkuDimensionsInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Dimesions</SectionHeader>
      <SimpleGrid columns={2} spacing={3}>
        <Box>
          <FormLabel>Length (in cm)</FormLabel>
          <FieldNumInput name="length" />
        </Box>
        <Box>
          <FormLabel>Width (in cm)</FormLabel>
          <FieldNumInput name="width" />
        </Box>
        <Box>
          <FormLabel>Height (in cm)</FormLabel>
          <FieldNumInput name="height" />
        </Box>
        <Box>
          <FormLabel>Weight (in Kg)</FormLabel>
          <FieldNumInput name="weight" />
        </Box>
      </SimpleGrid>
    </SectionCard>
  );
};

export default SkuDimensionsInputContainer;
