import SkuMini from "./SkuMini";

interface SkuMiniTableProps {
  productId: number;
  skus: any[];
}

const SkuMiniTable = (props: SkuMiniTableProps): JSX.Element => {
  const { skus } = props;
  return (
    <div>
      <div>Variants</div>
      {skus.map((sku) => (
        <SkuMini productId={props.productId} sku={sku} />
      ))}
    </div>
  );
};

export default SkuMiniTable;
