import Link from "next/link";
import { formatPrice } from "../utils/misc";
import RelativeImg from "./RelativeImg";

interface SkuMiniProps {
  productId: number;
  sku: any;
}

const SkuMini = (props: SkuMiniProps): JSX.Element => {
  const { sku } = props;

  return (
    <Link
      href="/product/[id]/sku/[skuId]"
      as={`/product/${props.productId}/sku/${sku.skuId}`}
    >
      <div className="container">
        <div className="mainContainer">
          <div className="imageContainer">
            <RelativeImg src={sku.imageRelativePaths[0]} />
          </div>
          <div>{sku.skuId}</div>
        </div>
        <div>
          <div>{formatPrice(sku.price)}</div>
          <div>Qty: {sku.qty}</div>
        </div>
        <style jsx>{`
          .container {
            padding: 0.8em;
            display: flex;
            max-width: 300px;
            justify-content: space-between;
            cursor: pointer;
          }
          .mainContainer {
            display: flex;
          }
          .imageContainer {
            width: 80px;
            height: 80px;
          }
        `}</style>
      </div>
    </Link>
  );
};

export default SkuMini;
