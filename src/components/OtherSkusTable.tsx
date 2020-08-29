import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/SectionCard";
import { ProductDetailSkuDetail } from "types/product";
import OtherSkuMini from "components/OtherSkuMini";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";

interface OtherSkusTableProps {
  skus: ProductDetailSkuDetail[];
}

const OtherSkusTable = (props: OtherSkusTableProps): JSX.Element | null => {
  const { skus } = props;

  if (skus.length === 0) {
    return null;
  }

  return (
    <SectionCard>
      <SectionHeaderContainer>
        <SectionHeader>Other Seller's Variants</SectionHeader>
      </SectionHeaderContainer>
      {skus.map((sku) => (
        <OtherSkuMini sku={sku} />
      ))}
    </SectionCard>
  );
};

export default OtherSkusTable;
