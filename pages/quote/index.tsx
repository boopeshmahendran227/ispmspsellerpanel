import { QuoteInterface } from "../../src/types/quote";
import RelativeImg from "../../src/components/RelativeImg";
import SortableTable from "../../src/components/SortableTable";
import Rating from "../../src/components/Rating";
import moment from "moment";
import { getProductUrl, formatPrice } from "../../src/utils/misc";
import Link from "next/link";
import QuoteActions from "../../src/actions/quote";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { getQuotes } from "../../src/selectors/quote";
import { RequestReducerState } from "../../src/reducers/utils";

interface StateProps {
  quotes: QuoteInterface[];
  getQuotesLoadingState: RequestReducerState;
}

interface DispatchProps {
  getQuotes: () => void;
}

type QuotesProps = StateProps & DispatchProps;

const getQuoteTotal = (quote: QuoteInterface) => {
  return quote.productDetails.reduce(
    (acc, productDetail) => acc + productDetail.price,
    0
  );
};

const Quotes = (props: QuotesProps) => {
  const { quotes } = props;
  return (
    <div className="container">
      <header>Quotes ({quotes.length})</header>
      <SortableTable
        initialSortData={{
          index: 2,
          isAsc: false
        }}
        headers={[
          {
            name: "Customer Name",
            valueFunc: quote => quote.customerId
          },
          {
            name: "Product Details",
            valueFunc: quote => null
          },
          {
            name: "Created",
            valueFunc: quote => quote.createdDateTime
          },
          {
            name: "Quote Total",
            valueFunc: getQuoteTotal
          }
        ]}
        data={quotes}
        emptyMsg="Sorry! We couldn't find any quotes. Please add one."
        body={quotes =>
          quotes.map(quote => (
            <tr key={quote.id}>
              <td>Boopesh</td>
              <td>
                {quote.productDetails.map(productDetail => (
                  <div key={productDetail.id} className="productContainer">
                    <div className="infoContainer">
                      <div className="imageContainer">
                        <RelativeImg
                          src={
                            productDetail.productDetails.imageRelativePaths[0]
                          }
                        ></RelativeImg>
                      </div>
                      <div className="contentContainer">
                        <Link
                          href="/p/[...params]"
                          as={getProductUrl(
                            productDetail.productDetails.name,
                            productDetail.productId
                          )}
                        >
                          <>
                            <a className="name">
                              {productDetail.productDetails.name}
                            </a>
                            <div>
                              {productDetail.productDetails.attributeValueIds
                                .map(attributeValueId => attributeValueId.value)
                                .join(" ")}
                            </div>
                          </>
                        </Link>
                        <Rating
                          value={productDetail.productDetails.averageRating}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="infoHeader">Quote Price: </span>₹
                      {formatPrice(productDetail.price)}
                    </div>
                    <div>
                      <span className="infoHeader">Quantity: </span>
                      {productDetail.qty}
                    </div>
                  </div>
                ))}
              </td>
              <td>
                {moment
                  .utc(quote.createdDateTime)
                  .local()
                  .format("MMMM Do YYYY, hh:mm A")}
              </td>
              <td>₹{formatPrice(getQuoteTotal(quote))}</td>
            </tr>
          ))
        }
      />
      <style jsx>{`
        .container {
          padding: 2em;
          max-width: 1200px;
          margin: 1em auto;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          font-weight: 500;
          font-size: 1.2rem;
          padding: 0.5em;
        }
        .productContainer {
          text-align: initial;
          margin: 1em 0;
        }
        .infoContainer {
          display: flex;
        }
        .name {
          font-weight: 500;
          font-size: 1rem;
        }
        .imageContainer {
          width: 7rem;
          text-align: center;
          padding: 0.5em;
          padding-left: 0;
        }
        .contentContainer {
          padding-top: 1em;
        }
        .infoHeader {
          font-weight: 500;
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  quotes: getQuotes(state),
  getQuotesLoadingState: state.quote.quote
});

const mapDispatchToProps: DispatchProps = {
  getQuotes: QuoteActions.getQuotes
};

const mapPropsToLoadData = (props: QuotesProps) => {
  return [
    {
      data: props.quotes,
      fetch: props.getQuotes,
      loadingState: props.getQuotesLoadingState
    }
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Quotes));
