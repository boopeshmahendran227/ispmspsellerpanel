import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/SectionCard";
import Button from "components/atoms/Button";
import Link from "next/link";
import { ProductDetailSkuDetail } from "types/product";
import YourSkuMini from "components/YourSkuMini";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface YourVariantsTableProps {
  productId: number;
  skus: ProductDetailSkuDetail[];
}

const YourVariantsTable = (
  props: YourVariantsTableProps
): JSX.Element | null => {
  const { productId, skus } = props;

  if (skus.length === 0) {
    return null;
  }

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <FlexContainer>
          <SectionHeader>Your Variants</SectionHeader>
          <Link
            href="/product/[id]/sku/new"
            as={`/product/${productId}/sku/new`}
          >
            <Button>Add New Variant</Button>
          </Link>
        </FlexContainer>
      </SectionHeaderContainer>
      {skus.map((sku) => (
        <YourSkuMini productId={productId} sku={sku} />
      ))}
    </SectionCard>
  );
};

export default YourVariantsTable;
