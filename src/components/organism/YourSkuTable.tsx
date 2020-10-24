import SectionHeader from "components/atoms/SectionHeader";
import SectionCard from "components/atoms/SectionCard";
import Button from "components/atoms/Button";
import Link from "next/link";
import { ProductDetailSkuDetail } from "types/product";
import YourSkuMini from "components/molecules/YourSkuMini";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import { Flex } from "@chakra-ui/core";

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
        <Flex justify="space-between" w="100%">
          <SectionHeader>Your Variants</SectionHeader>
          <Link
            href="/product/[id]/sku/new"
            as={`/product/${productId}/sku/new`}
          >
            <Button>Add New Variant</Button>
          </Link>
        </Flex>
      </SectionHeaderContainer>
      {skus.map((sku) => (
        <YourSkuMini key={sku.skuId} productId={productId} sku={sku} />
      ))}
    </SectionCard>
  );
};

export default YourVariantsTable;
