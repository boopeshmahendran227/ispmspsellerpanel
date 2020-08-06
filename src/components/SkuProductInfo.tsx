import RelativeImg from "./RelativeImg";
import Link from "next/link";
import Card from "./Card";
import CSSConstants from "../constants/CSSConstants";

interface SkuProductInfoProps {
  productId: number;
  productName: string;
  image: string;
}

const SkuProductInfo = (props: SkuProductInfoProps): JSX.Element => {
  const { productId, productName, image } = props;

  return (
    <div className="container">
      <Card>
        <section className="mainContainer">
          <div className="imageContainer">
            <RelativeImg src={image}></RelativeImg>
          </div>
          <div className="contentContainer">
            <div className="name">{productName}</div>
            <Link href="/product/[id]" as={`/product/${productId}`}>
              <a className="backToProductLink">Back to product</a>
            </Link>
          </div>
        </section>
      </Card>
      <style jsx>{`
        .container {
          width: 300px;
        }
        .imageContainer {
          width: 50px;
          height: 50px;
          margin: 1em;
        }
        .mainContainer {
          display: flex;
        }
        .name {
          font-weight: bold;
        }
        .backToProductLink {
          display: inline-block;
          margin: 0.6em 0;
          color: ${CSSConstants.secondaryColor};
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default SkuProductInfo;
