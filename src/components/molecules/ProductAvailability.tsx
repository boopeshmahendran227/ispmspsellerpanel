import SectionHeader from "../atoms/SectionHeader";
import SectionCard from "../atoms/SectionCard";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { EcosystemDetailInterface } from "types/product";
import { Box } from "@chakra-ui/core";

interface ProductAvailabilityProps {
  ecosystems: EcosystemDetailInterface[];
}

const ProductAvailability = (props: ProductAvailabilityProps): JSX.Element => {
  const { ecosystems } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Availability</SectionHeader>
        <Box m="0.4em 0" color="secondaryTextColor">
          Available on {ecosystems.length} ecosystems
        </Box>
      </SectionHeaderContainer>
      {ecosystems.map((ecosystem) => (
        <Box textTransform="capitalize" m="0.5em 0">
          {ecosystem.name}
        </Box>
      ))}
    </SectionCard>
  );
};

export default ProductAvailability;
