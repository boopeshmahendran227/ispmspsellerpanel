import RelativeImg from "./RelativeImg";
import Link from "next/link";
import Card from "./atoms/Card";
import CSSConstants from "../constants/CSSConstants";
import styled from "styled-components";

interface SkuProductInfoProps {
  productId: number;
  productName: string;
  image: string;
}

const Container = styled.div`
  width: 300px;
`;

const MainContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 1em;
`;

const BackToProductLink = styled.a`
  display: inline-block;
  margin: 0.6em 0;
  color: ${CSSConstants.secondaryColor};
  text-decoration: none;
`;

const SkuProductInfo = (props: SkuProductInfoProps): JSX.Element => {
  const { productId, productName, image } = props;

  return (
    <Container>
      <Card>
        <MainContainer>
          <ImageContainer>
            <RelativeImg src={image}></RelativeImg>
          </ImageContainer>
          <div>
            <strong>{productName}</strong>
            <div>
              <Link href="/product/[id]" as={`/product/${productId}`}>
                <BackToProductLink>Back to product</BackToProductLink>
              </Link>
            </div>
          </div>
        </MainContainer>
      </Card>
    </Container>
  );
};

export default SkuProductInfo;
