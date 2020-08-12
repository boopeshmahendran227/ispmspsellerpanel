import styled from "styled-components";
import { formatPrice } from "utils/misc";
import SectionHeader from "./atoms/SectionHeader";
import SectionCard from "./SectionCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 0.4em;
`;

const Key = styled.div`
  font-weight: bold;
`;

const Value = styled.div``;

interface ProductPriceDetailsProps {
  minPrice: number;
  maxPrice: number;
  specialDiscount: number;
}

const ProductPriceDetails = (props: ProductPriceDetailsProps): JSX.Element => {
  const { minPrice, maxPrice, specialDiscount } = props;

  return (
    <SectionCard>
      <SectionHeader>Price Details</SectionHeader>
      <Grid>
        <Key>Min Price</Key>
        <Value>{formatPrice(minPrice)}</Value>
        <Key>Max Price</Key>
        <Value>{formatPrice(maxPrice)}</Value>
        <Key>Special Discount</Key>
        <Value>{formatPrice(specialDiscount)}</Value>
      </Grid>
    </SectionCard>
  );
};

export default ProductPriceDetails;
