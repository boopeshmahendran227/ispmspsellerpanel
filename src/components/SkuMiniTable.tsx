import SkuMini from "components/SkuMini";
import SectionHeader from "components/SectionHeader";
import SectionCard from "components/SectionCard";
import Button from "components/atoms/Button";
import Link from "next/link";
import { ProductDetailSkuDetail } from "types/product";

interface SkuMiniTableProps {
  productId: number;
  skus: ProductDetailSkuDetail[];
}

const SkuMiniTable = (props: SkuMiniTableProps): JSX.Element => {
  const { productId, skus } = props;

  return (
    <SectionCard>
      <SectionHeader>Your Variants</SectionHeader>
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
