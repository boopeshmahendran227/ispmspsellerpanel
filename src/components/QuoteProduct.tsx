import { ProductDetailQuoteInterface } from "../types/quote";
import { formatPrice } from "utils/misc";
import CSSConstants from "../constants/CSSConstants";
import ProductCard from "./molecules/ProductCard";

interface QuoteProductProps {
  productDetail: ProductDetailQuoteInterface;
}

const QuoteProduct = (props: QuoteProductProps) => {
  const { productDetail } = props;

  return (
    <div className="container">
      <section className="productContainer">
        <ProductCard
          name={productDetail.productDetails.name}
          image={productDetail.productDetails.imageRelativePaths[0]}
          metaInfo={[
            ...productDetail.productDetails.attributeValueIds.map(
              (attributeValue) => ({
                key: attributeValue.attributeName,
                value: attributeValue.value,
              })
            ),
            {
              key: "Product Id",
              value: productDetail.productId,
            },
            {
              key: "Sku Id",
              value: productDetail.skuId,
            },
            {
              key: "Original Price",
              value: `${formatPrice(productDetail.productDetails.skuPrice)} x
                      ${productDetail.qty} = ${formatPrice(
                productDetail.productDetails.skuPrice * productDetail.qty
              )}`,
            },
            {
              key: "Qty",
              value: productDetail.qty,
            },
          ]}
        />
      </section>
      <section className="requestedPrice">
        <div className="name">Requested Quote</div>
        <div className="value">
          {formatPrice(productDetail.price / productDetail.qty)} x{" "}
          {productDetail.qty} = {formatPrice(productDetail.price)}
        </div>
      </section>
      <section className="respondedPrice">
        <div className="name">Responded Quote</div>
        <div className="value">
          {productDetail.updatedQuote ? (
            <div>
              {formatPrice(
                productDetail.updatedQuote.totalDiscountedPrice /
                  productDetail.qty
              )}{" "}
              x {productDetail.qty} ={" "}
              {formatPrice(productDetail.updatedQuote.totalDiscountedPrice)}
            </div>
          ) : (
            <div className="notRespondedMsg">Not yet Responded</div>
          )}
        </div>
      </section>
      <style jsx>{`
        .container {
          padding: 0.5em;
          margin: 0.5em;
          display: flex;
        }
        .requestedPrice,
        .respondedPrice {
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .requestedPrice .name,
        .respondedPrice .name {
          font-size: 1.1rem;
        }
        .requestedPrice .name {
          color: ${CSSConstants.warningColor};
        }
        .respondedPrice .name {
          color: ${CSSConstants.successColor};
        }
        @media (min-width: 800px) {
          .container {
            display: flex;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

export default QuoteProduct;
