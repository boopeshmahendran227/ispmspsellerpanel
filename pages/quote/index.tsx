import { QuoteInterface } from "../../src/types/quote";
import SortableTable from "../../src/components/SortableTable";
import moment from "moment";
import { formatPrice } from "../../src/utils/misc";
import QuoteActions from "../../src/actions/quote";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { getQuotes } from "../../src/selectors/quote";
import { RequestReducerState } from "../../src/reducers/utils";
import ProductCard from "../../src/components/ProductCard";

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
          index: 3,
          isAsc: false,
        }}
        headers={[
          {
            name: "Customer",
            valueFunc: (quote: QuoteInterface) => quote.customerId,
          },
          {
            name: "Product Details",
            valueFunc: (quote: QuoteInterface) => null,
          },
          {
            name: "Quote Total",
            valueFunc: getQuoteTotal,
          },
          {
            name: "Created",
            valueFunc: (quote: QuoteInterface) => quote.createdDateTime,
          },
          {
            name: "Action",
            valueFunc: (quote: QuoteInterface) => null,
          },
        ]}
        data={quotes}
        emptyMsg="There are no quotes requested"
        body={(quotes) =>
          quotes.map((quote: QuoteInterface) => (
            <tr key={quote.id}>
              <td>{quote.customerId}</td>
              <td>
                {quote.productDetails.map((productDetail) => (
                  <div key={productDetail.id} className="productContainer">
                    <ProductCard
                      name={productDetail.productDetails.name}
                      image={productDetail.productDetails.imageRelativePaths[0]}
                      attributeValues={
                        productDetail.productDetails.attributeValueIds
                      }
                    />
                    <div>
                      <span className="infoHeader">Quote Price: </span>
                      {formatPrice(productDetail.price)}
                    </div>
                    <div>
                      <span className="infoHeader">Quantity: </span>
                      {productDetail.qty}
                    </div>
                  </div>
                ))}
              </td>
              <td>{formatPrice(getQuoteTotal(quote))}</td>
              <td>
                {moment
                  .utc(quote.createdDateTime)
                  .local()
                  .format("MMMM Do YYYY, hh:mm A")}
              </td>
              <td>
                <a>Delete</a>
              </td>
            </tr>
          ))
        }
      />
      <style jsx>{`
        .container {
          padding: 1em 0;
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
  getQuotesLoadingState: state.quote.quote,
});

const mapDispatchToProps: DispatchProps = {
  getQuotes: QuoteActions.getQuotes,
};

const mapPropsToLoadData = (props: QuotesProps) => {
  return [
    {
      data: props.quotes,
      fetch: props.getQuotes,
      loadingState: props.getQuotesLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Quotes));
