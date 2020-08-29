import RelativeImg from "./RelativeImg";
import styled from "styled-components";
import { ProductDetailSkuDetail } from "types/product";
import Button from "./atoms/Button";
import Link from "next/link";
import { AttributeValueID } from "types/sku";
import CSSConstants from "../constants/CSSConstants";

const Container = styled.div`
  padding: 0.8em 0;
  display: flex;
  justify-content: space-between;
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

const AttributeValues = styled.div`
  margin-top: 0.4em;
  color: ${CSSConstants.secondaryTextColor};
`;

const AttributeValue = styled.div`
  margin-top: 0.2em;
`;

interface OtherSkuMiniProps {
  productId: number;
  sku: ProductDetailSkuDetail;
}

const OtherSkuMini = (props: OtherSkuMiniProps): JSX.Element => {
  const { productId, sku } = props;

  return (
    <Container>
      <MainContainer>
        <ImageContainer>
          <RelativeImg src={sku.imageRelativePaths[0]} />
        </ImageContainer>
        <div>
          <SkuName>{sku.skuId}</SkuName>
          <AttributeValues>
            {sku.attributeValueIds.map((attributeValueId: AttributeValueID) => (
              <AttributeValue>
                {attributeValueId.attributeName + ": " + attributeValueId.value}
              </AttributeValue>
            ))}
          </AttributeValues>
        </div>
      </MainContainer>
      <div>
        <Link
          href={`/product/[id]/sku/new?copySkuId=${sku.skuId}`}
          as={`/product/${productId}/sku/new?copySkuId=${sku.skuId}`}
        >
          <Button>Add to Your Variants</Button>
        </Link>
      </div>
    </Container>
  );
};

export default OtherSkuMini;
