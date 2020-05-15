import { connect } from "react-redux";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "../../src/components/TabSection";
import SortableTable from "../../src/components/SortableTable";
import {
  QuoteInterface,
  QuoteStatus,
  getQuoteStatusText,
} from "../../src/types/quote";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import Link from "next/link";
import ProductCard from "../../src/components/ProductCard";
import moment from "moment";
import Button, { ButtonType } from "../../src/components/Button";
import QuoteActions from "../../src/actions/quote";

interface DispatchProps {
  acceptQuote: (quoteId: number) => void;
  updateQuote: (quoteId: number) => void;
  rejectQuote: (quoteId: number) => void;
}

type QuotesProps = DispatchProps;

const getTotalPrice = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) => acc + productDetail.price,
    0
  );

const getTotalQty = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) => acc + productDetail.qty,
    0
  );

const Quotes = (props: QuotesProps) => {
  const getTableHeaders = () => {
    return [
      {
        name: "Quote Id",
        valueFunc: (quote: QuoteInterface) => quote.id,
      },
      {
        name: "Customer",
        valueFunc: (quote: QuoteInterface) => null,
      },
      {
        name: "Product",
        valueFunc: (quote: QuoteInterface) => null,
      },
      {
        name: "Total Requested Price",
        valueFunc: (quote: QuoteInterface) => getTotalPrice(quote),
      },
      {
        name: "Total Qty",
        valueFunc: (quote: QuoteInterface) => getTotalQty(quote),
      },
      {
        name: "Status",
        valueFunc: (quote: QuoteInterface) => getQuoteStatusText(quote.status),
      },
      {
        name: "Created",
        valueFunc: (quote: QuoteInterface) => quote.createdDateTime,
      },
      {
        name: "Actions",
        valueFunc: (quote: QuoteInterface) => null,
      },
    ];
  };

  const getButtons = (quote: QuoteInterface) => {
    const handleClick = (e, action) => {
      action(quote.id);
      e.preventDefault();
    };

    switch (quote.status) {
      case QuoteStatus.SellerResponsePending:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={(e) => handleClick(e, props.acceptQuote)}
            >
              Accept Quote
            </Button>
            <Button
              type={ButtonType.warning}
              onClick={(e) => handleClick(e, props.updateQuote)}
            >
              Update Quote
            </Button>
            <Button
              type={ButtonType.danger}
              onClick={(e) => handleClick(e, props.rejectQuote)}
              outlined={true}
            >
              Reject Quote
            </Button>
          </>
        );
    }
    return null;
  };

  const renderTableBody = (quotes: QuoteInterface[]) => {
    return quotes.map((quote) => (
      <Link key={quote.id} href="/quote/[id]" as={`/qoute/${quote.id}`}>
        <tr>
          <td>{quote.id}</td>
          <td>{quote.customerId}</td>
          <td>
            {quote.productDetails.map((productDetail) => (
              <div className="productContainer">
                <ProductCard
                  name={productDetail.productDetails.name}
                  image={productDetail.productDetails.imageRelativePaths[0]}
                  attributeValues={
                    productDetail.productDetails.attributeValueIds
                  }
                />
                <div className="infoGrid">
                  <span className="header">Product Id: </span>
                  <span className="value">{productDetail.productId}</span>
                  <span className="header">Sku Id: </span>
                  <span className="value">{productDetail.skuId}</span>
                  <span className="header">Requested Quote: </span>
                  <span className="value">
                    {productDetail.price / productDetail.qty} x{" "}
                    {productDetail.qty} = {productDetail.price}
                  </span>
                </div>
              </div>
            ))}
          </td>
          <td>{getTotalPrice(quote)}</td>
          <td>{getTotalQty(quote)}</td>
          <td>{getQuoteStatusText(quote.status)}</td>
          <td>
            {moment
              .utc(quote.createdDateTime)
              .local()
              .format("MMMM Do YYYY, hh:mm A")}
          </td>
          <td>{getButtons(quote)}</td>
          <style jsx>{`
            .productContainer {
              text-align: initial;
              margin: 1.2em 0;
            }
            .infoGrid {
              margin: 0.1em;
              display: grid;
              grid-template-columns: repeat(2, auto);
              grid-gap: 0.1em;
            }
            .infoGrid .header {
              font-weight: 700;
            }
            tr:hover {
              background-color: ${CSSConstants.hoverColor} !important;
              cursor: pointer;
            }
            .actions {
              font-size: 0.9rem;
            }
          `}</style>
        </tr>
      </Link>
    ));
  };

  const swr = useSWR("/quote");
  const quotes: QuoteInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }
  if (!quotes) {
    return <Loader />;
  }

  const openQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.SellerResponsePending
  );

  const respondedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.SellerResponded
  );

  const convertedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Converted
  );

  const rejectedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Rejected
  );

  const expiredQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Expired
  );

  return (
    <div className="container">
      <TabSection
        headingList={[
          `All Quotes (${quotes.length})`,
          `Open Quotes (${openQuotes.length})`,
          `Responded Quotes (${respondedQuotes.length})`,
          `Converted Quotes (${convertedQuotes.length})`,
          `Rejected Quotes (${rejectedQuotes.length})`,
          `Expired Quotes (${expiredQuotes.length})`,
        ]}
        contentList={[
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={quotes}
            emptyMsg="There are no quotes"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={openQuotes}
            emptyMsg="There are no open quotes"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={respondedQuotes}
            emptyMsg="There are no responded quotes"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={convertedQuotes}
            emptyMsg="There are no converted quotes"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={rejectedQuotes}
            emptyMsg="There are no rejected quotes"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={expiredQuotes}
            emptyMsg="There are no expired quotes"
            body={renderTableBody}
          />,
        ]}
      />
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
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

const mapDispatchToProps: DispatchProps = {
  acceptQuote: QuoteActions.acceptQuote,
  updateQuote: QuoteActions.updateQuote,
  rejectQuote: QuoteActions.rejectQuote,
};

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Quotes);
