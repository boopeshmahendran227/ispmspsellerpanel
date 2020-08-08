import SkuMini from "./SkuMini";
import SectionHeader from "./SectionHeader";
import SectionCard from "./SectionCard";
import Button from "./atoms/Button";
import Link from "next/link";

interface SkuMiniTableProps {
  productId: number;
  skus: any[];
}

const SkuMiniTable = (props: SkuMiniTableProps): JSX.Element => {
  const { productId, skus } = props;

  return (
    <SectionCard>
      <SectionHeader>Variants</SectionHeader>
      <Link href="/product/[id]/sku/new" as={`/product/${productId}/sku/new`}>
        <Button>Add Variant</Button>
      </Link>
      {skus.map((sku) => (
        <SkuMini productId={productId} sku={sku} />
      ))}
    </SectionCard>
  );
};

export default SkuMiniTable;
