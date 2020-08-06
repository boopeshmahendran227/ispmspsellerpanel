import styled from "styled-components";
import Card from "./Card";
import { formatPrice } from "../utils/misc";

const Header = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1.1em;
`;

const Container = styled.div`
  margin: 1em 0;
`;

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
    <Container>
      <Card>
        <Header>Price Details</Header>
        <Grid>
          <Key>Min Price</Key>
          <Value>{formatPrice(minPrice)}</Value>
          <Key>Max Price</Key>
          <Value>{formatPrice(maxPrice)}</Value>
          <Key>Special Discount</Key>
          <Value>{formatPrice(specialDiscount)}</Value>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductPriceDetails;
