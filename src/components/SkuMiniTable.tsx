import SkuMini from "./SkuMini";
import Card from "./Card";

interface SkuMiniTableProps {
  productId: number;
  skus: any[];
}

const SkuMiniTable = (props: SkuMiniTableProps): JSX.Element => {
  const { skus } = props;
  return (
    <div className="container">
      <Card>
        <div>Variants</div>
        {skus.map((sku) => (
          <SkuMini productId={props.productId} sku={sku} />
        ))}
      </Card>
    </div>
  );
};

export default SkuMiniTable;
