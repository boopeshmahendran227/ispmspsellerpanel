import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/atoms/SectionCard";
import { ProductDetailSkuDetail } from "types/product";
import OtherSkuMini from "components/OtherSkuMini";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";

interface OtherSkusTableProps {
  productId: number;
  skus: ProductDetailSkuDetail[];
}

const OtherSkusTable = (props: OtherSkusTableProps): JSX.Element | null => {
  const { productId, skus } = props;

  if (skus.length === 0) {
    return null;
  }

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Other Seller's Variants</SectionHeader>
      </SectionHeaderContainer>
      {skus.map((sku) => (
        <OtherSkuMini key={sku.skuId} productId={productId} sku={sku} />
      ))}
    </SectionCard>
  );
};

export default OtherSkusTable;
