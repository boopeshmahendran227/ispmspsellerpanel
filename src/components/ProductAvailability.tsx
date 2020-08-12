import styled from "styled-components";
import SectionHeader from "./atoms/SectionHeader";
import SectionCard from "./SectionCard";
import CSSConstants from "../constants/CSSConstants";

const SubText = styled.div`
  color: ${CSSConstants.secondaryTextColor};
`;

interface ProductAvailabilityProps {
  ecosystemsIds: string[];
}

const ProductAvailability = (props: ProductAvailabilityProps): JSX.Element => {
  const { ecosystemsIds } = props;

  return (
    <SectionCard>
      <SectionHeader>Availability</SectionHeader>
      <SubText>Available on {ecosystemsIds.length} ecosystems</SubText>
    </SectionCard>
  );
};

export default ProductAvailability;
