import styled from "styled-components";
import Card from "./Card";

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

interface ProductMainInfoProps {
  name: string;
  brand: string;
  shortDescription: string;
  longDescription: string;
}

const ProductMainInfo = (props: ProductMainInfoProps): JSX.Element => {
  const { name, brand, shortDescription, longDescription } = props;

  return (
    <Container>
      <Card>
        <Header>Main Details</Header>
        <Grid>
          <Key>Name</Key>
          <Value>{name}</Value>
          <Key>Brand</Key>
          <Value>{brand}</Value>
          <Key>Short Description</Key>
          <Value>{shortDescription}</Value>
          <Key>Long Description</Key>
          <Value>{longDescription}</Value>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductMainInfo;
