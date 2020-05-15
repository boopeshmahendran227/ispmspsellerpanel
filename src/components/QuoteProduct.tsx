import { ProductDetailQuoteInterface } from "../types/quote";
import RelativeImg from "./RelativeImg";
import { formatPrice } from "../utils/misc";
import CSSConstants from "../constants/CSSConstants";

interface QuoteProductProps {
  productDetail: ProductDetailQuoteInterface;
}

const QuoteProduct = (props: QuoteProductProps) => {
  const { productDetail } = props;

  return (
    <div className="container">
      <section className="productContainer">
        <div className="imageContainer">
          <RelativeImg
            src={productDetail.productDetails.imageRelativePaths[0]}
          ></RelativeImg>
        </div>
        <div className="contentContainer">
          <div className="name">{productDetail.productDetails.name}</div>
          <div className="metaInformation">
            {productDetail.productDetails.attributeValueIds.map(
              (attributeValue) => (
                <div>
                  {attributeValue.attributeName}: {attributeValue.value}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="requestedPrice">
        <div className="name">Quote Requested</div>
        <div className="value">
          {formatPrice(productDetail.price / productDetail.qty)} x{" "}
          {productDetail.qty}
        </div>
      </section>
      <style jsx>{`
        .container {
          padding: 1.4em 3em 1.4em 1em;
          margin: 0.5em;
        }
        .productContainer {
          display: flex;
        }
        .imageContainer {
          width: 8rem;
          text-align: center;
          padding: 0 0.5em;
        }
        .requestedPrice {
          font-size: 1.1rem;
          line-height: 1.4;
        }
        .requestedPrice .name {
          color: ${CSSConstants.secondaryTextColor};
        }
        .metaInformation {
          color: ${CSSConstants.secondaryTextColor};
          margin-top: 0.8em;
          font-size: 0.9rem;
          line-height: 1.3;
        }
        @media (min-width: 800px) {
          .container {
            display: flex;
            justify-content: space-between;
          }
          .requestedPrice {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteProduct;
