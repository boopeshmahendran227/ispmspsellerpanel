import SectionCard from "components/atoms/SectionCard";
import SectionHeader from "components/atoms/SectionHeader";
import FieldNumInput from "components/atoms/FieldNumInput";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
`;

const SkuDimensionsInputContainer = (): JSX.Element => {
  return (
    <SectionCard>
      <SectionHeader>Dimesions</SectionHeader>
      <Grid>
        <div>
          <label>Length (in cm)</label>
          <FieldNumInput name="length" />
        </div>
        <div>
          <label>Width (in cm)</label>
          <FieldNumInput name="width" />
        </div>
        <div>
          <label>Height (in cm)</label>
          <FieldNumInput name="height" />
        </div>
        <div>
          <label>Weight (in Kg)</label>
          <FieldNumInput name="weight" />
        </div>
      </Grid>
    </SectionCard>
  );
};

export default SkuDimensionsInputContainer;
