import RelativeImg from "components/RelativeImg";
import CSSConstants from "src/constants/CSSConstants";
import Link from "next/link";
import classNames from "classnames";
import { ProductDetailSkuDetail } from "types/product";

interface SkuListProps {
  productId: number;
  skus: ProductDetailSkuDetail[];
  currentSkuId: string;
}

const SkuList = (props: SkuListProps): JSX.Element => {
  const { productId, skus } = props;

  return (
    <div className="container">
      <header>Variants</header>
      <div className="body">
        {skus.map((sku) => (
          <Link
            href="/product/[id]/sku/[skuId]"
            as={`/product/${productId}/sku/${sku.skuId}`}
          >
            <div
              className={classNames("sku", {
                active: props.currentSkuId === sku.skuId,
              })}
            >
              <div className="imageContainer">
                <RelativeImg src={sku.imageRelativePaths[0]} />
              </div>
              {sku.skuId}
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .container {
          width: 300px;
          background: ${CSSConstants.foregroundColor};
          margin: 1em 0;
          border: ${CSSConstants.borderStyle};
        }
        header {
          padding: 1.1em 0.9em;
          font-size: 1.2rem;
          font-weight: bold;
          background: ${CSSConstants.hoverColor};
        }
        .body {
          max-height: 300px;
          overflow-y: auto;
        }
        .sku {
          display: flex;
          padding: 0.5em;
          border-top: ${CSSConstants.borderStyle};
          cursor: pointer;
          transition: all 0.3s;
        }
        .sku.active {
          background: ${CSSConstants.secondaryColor};
          color: white;
        }
        .imageContainer {
          width: 50px;
          height: 50px;
          margin: 0.3em;
        }
      `}</style>
    </div>
  );
};

export default SkuList;
