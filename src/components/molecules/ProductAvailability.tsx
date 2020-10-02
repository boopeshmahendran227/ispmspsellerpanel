import styled from "styled-components";
import SectionHeader from "../atoms/SectionHeader";
import SectionCard from "../atoms/SectionCard";
import CSSConstants from "../../constants/CSSConstants";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { EcosystemDetailInterface } from "types/product";

const SubText = styled.div`
  margin: 0.4em 0;
  color: ${CSSConstants.secondaryTextColor};
`;

const EcosystemName = styled.div`
  text-transform: capitalize;
  margin: 0.5em 0;
`;

interface ProductAvailabilityProps {
  ecosystems: EcosystemDetailInterface[];
}

const ProductAvailability = (props: ProductAvailabilityProps): JSX.Element => {
  const { ecosystems } = props;

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Availability</SectionHeader>
        <SubText>Available on {ecosystems.length} ecosystems</SubText>
      </SectionHeaderContainer>
      {ecosystems.map((ecosystem) => (
        <EcosystemName>{ecosystem.name}</EcosystemName>
      ))}
    </SectionCard>
  );
};

export default ProductAvailability;
