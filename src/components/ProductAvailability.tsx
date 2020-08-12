import styled from "styled-components";
import SectionHeader from "./atoms/SectionHeader";
import SectionCard from "./SectionCard";
import CSSConstants from "../constants/CSSConstants";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";

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
      <SectionHeaderContainer>
        <SectionHeader>Availability</SectionHeader>
      </SectionHeaderContainer>
      <SubText>Available on {ecosystemsIds.length} ecosystems</SubText>
    </SectionCard>
  );
};

export default ProductAvailability;
