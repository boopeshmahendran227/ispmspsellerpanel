import RelativeImg from "./RelativeImg";
import CSSConstants from "../constants/CSSConstants";
import Link from "next/link";

interface SkuListProps {
  productId: number;
  skus: any[];
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
            <div className="sku">
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
        }
        header {
          padding: 0.5em;
          font-size: 1.2rem;
          font-weight: bold;
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
        }
        .sku:first-child {
          background: ${CSSConstants.primaryColor};
          color: white;
        }
        .imageContainer {
          width: 50px;
          height: 50px;
        }
      `}</style>
    </div>
  );
};

export default SkuList;
