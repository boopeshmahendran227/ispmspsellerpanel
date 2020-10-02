import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldNumInput from "components/molecules/FieldNumInput";
import FieldInput from "components/molecules/FieldInput";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const SkuInventoryInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Inventory</SectionHeader>
      <Grid>
        <div>
          <label>Qty</label>
          <FieldNumInput name="qty" />
        </div>
        <div>
          <label>Bar Code</label>
          <FieldInput name="barCode" />
        </div>
        <div>
          <label>External Id</label>
          <FieldInput name="externalId" />
        </div>
      </Grid>
    </SectionCard>
  );
};

export default SkuInventoryInputContainer;
