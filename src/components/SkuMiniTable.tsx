import SkuMini from "./SkuMini";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";

interface SkuMiniTableProps {
  productId: number;
  skus: any[];
}

const SkuMiniTable = (props: SkuMiniTableProps): JSX.Element => {
  const { skus } = props;
  return (
    <SectionCard>
      <SectionHeader>Variants</SectionHeader>
      {skus.map((sku) => (
        <SkuMini productId={props.productId} sku={sku} />
      ))}
    </SectionCard>
  );
};

export default SkuMiniTable;
