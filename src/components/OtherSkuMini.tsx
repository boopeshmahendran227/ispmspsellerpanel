import RelativeImg from "./RelativeImg";
import styled from "styled-components";
import { ProductDetailSkuDetail } from "types/product";
import Button from "./atoms/Button";

const Container = styled.div`
  padding: 0.8em 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 60px;
  height: 80px;
  text-align: center;
  margin-right: 0.2em;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SkuName = styled.div`
  font-weight: bold;
`;

interface OtherSkuMiniProps {
  sku: ProductDetailSkuDetail;
}

const OtherSkuMini = (props: OtherSkuMiniProps): JSX.Element => {
  const { sku } = props;

  return (
    <Container>
      <MainContainer>
        <ImageContainer>
          <RelativeImg src={sku.imageRelativePaths[0]} />
        </ImageContainer>
        <SkuName>{sku.skuId}</SkuName>
      </MainContainer>
      <div>
        <Button>Add to Your Variants</Button>
      </div>
    </Container>
  );
};

export default OtherSkuMini;
