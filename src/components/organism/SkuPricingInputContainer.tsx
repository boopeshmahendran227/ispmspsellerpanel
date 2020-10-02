import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldPriceInput from "components/molecules/FieldPriceInput";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const SkuPricingInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Pricing</SectionHeader>
      <Grid>
        <div>
          <label>Price</label>
          <FieldPriceInput name="price" />
        </div>
        <div>
          <label>Bought Price</label>
          <FieldPriceInput name="boughtPrice" />
        </div>
      </Grid>
    </SectionCard>
  );
};

export default SkuPricingInputContainer;
