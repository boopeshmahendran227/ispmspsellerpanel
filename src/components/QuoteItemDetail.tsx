import { QuoteStatus } from "../types/quote";
import { getQuoteStatusText, getColor } from "../../src/utils/quote";
import CSSConstants from "../constants/CSSConstants";
import Button, { ButtonType } from "./Button";
import _ from "lodash";
import moment from "moment";
import { QuoteInterface } from "../../src/types/quote";
import QuoteProduct from "./QuoteProduct";

interface QuoteItemDetailProps {
  quote: QuoteInterface;
  acceptQuote: (quoteId: number) => void;
  updateQuote: (quoteId: number) => void;
  rejectQuote: (quoteId: number) => void;
}

const QuoteItemDetail = (props: QuoteItemDetailProps) => {
  const { quote } = props;

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

  const buttons = getButtons(quote);
  const color = getColor(quote.status);
  const statusText = getQuoteStatusText(quote.status);

  const latestStatus = quote.statusHistories[quote.statusHistories.length - 1];

  return (
    <div className="container">
      <section className="itemContainer">
        <div className="productContainer">
          {quote.productDetails.map((productDetail) => (
            <QuoteProduct productDetail={productDetail} />
          ))}
        </div>
      </section>
      {Boolean(buttons) && (
        <section className="buttonContainer">{buttons}</section>
      )}
      <style jsx>{`
        .container {
          border: 1px solid ${CSSConstants.borderColor};
          background: ${CSSConstants.foregroundColor};
          border-color: ${color};
          max-width: 800px;
          margin: auto;
          margin-bottom: 1em;
          position: relative;
        }
        .productContainer {
          padding: 0 0.5em;
        }
        .container::before {
          content: "${statusText} on 
          ${moment
            .utc(latestStatus.createdDateTime)
            .local()
            .format("MMM DD YYYY")}";
          color: ${color};
          position: absolute;
          top: 1em;
          right: 1em;
          font-size: 1.2rem;
        }
        .itemContainer {
          padding: 0.4em 0.8em;
        }
        .info {
          display: grid;
          grid-template-columns: 100px 100px;
          color: ${CSSConstants.secondaryTextColor};
        }
        .info .key {
          font-weight: bold;
        }
        .buttonContainer {
          margin-top: 1em;
          border-top: 1px solid ${color};
          padding: 0.5em;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default QuoteItemDetail;
