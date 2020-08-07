import Link from "next/link";
import { formatPrice } from "../utils/misc";
import RelativeImg from "./RelativeImg";
import CSSConstants from "../constants/CSSConstants";
import styled from "styled-components";

const Container = styled.div`
  padding: 0.8em;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 0.4em;
  padding: 0.3em;
`;

const MainContainer = styled.div`
  display: flex;
`;

const SkuName = styled.div`
  font-weight: bold;
`;

const Quantity = styled.div`
  color: ${CSSConstants.secondaryTextColor};
`;

const Price = styled.div`
  font-size: 1.1rem;
`;

const ContentContainer = styled.div`
  width: 80px;
`;

interface SkuMiniProps {
  productId: number;
  sku: any;
}

const SkuMini = (props: SkuMiniProps): JSX.Element => {
  const { sku } = props;

  return (
    <Link
      href="/product/[id]/sku/[skuId]"
      as={`/product/${props.productId}/sku/${sku.skuId}`}
    >
      <Container>
        <MainContainer>
          <ImageContainer>
            <RelativeImg src={sku.imageRelativePaths[0]} />
          </ImageContainer>
          <SkuName>{sku.skuId}</SkuName>
        </MainContainer>
        <ContentContainer>
          <Price>{formatPrice(sku.price)}</Price>
          <Quantity>Qty: {sku.qty}</Quantity>
        </ContentContainer>
      </Container>
    </Link>
  );
};

export default SkuMini;
