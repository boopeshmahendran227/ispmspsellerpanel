import moment from "moment";
import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../src/components/Loader";
import { connect } from "react-redux";
import { QuoteInterface } from "../../src/types/quote";
import { getQuoteStatusText } from "../../src/utils/quote";
import QuoteItemDetail from "../../src/components/QuoteItemDetail";
import QuoteActions from "../../src/actions/quote";
import PageError from "../../src/components/PageError";

interface DispatchProps {
  rejectQuote: (quote: QuoteInterface) => void;
  updateQuote: (quote: QuoteInterface) => void;
}

type QuoteProps = DispatchProps;

const Quote = (props: QuoteProps) => {
  const router = useRouter();

  const swr = useSWR(`/quote`);
  const quotes: QuoteInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!quotes) {
    return <Loader />;
  }

  const quote: QuoteInterface = quotes.find(
    (quote: QuoteInterface) => quote.id === Number(router.query.id)
  );

  return (
    <div className="container">
      <Link href="/quote">
        <a className="backBtn">
          <i className="icon fas fa-chevron-left"></i> Back to Quotes
        </a>
      </Link>
      <header>
        <span className="id">#{quote.id}</span>{" "}
        <span className="time">
          {moment
            .utc(quote.createdDateTime)
            .local()
            .format("MMMM Do YYYY h:mm a")}
        </span>{" "}
        <span className="status">{getQuoteStatusText(quote.status)}</span>
      </header>
      <div className="flexContainer">
        <div className="col1">
          <section className="itemContainer">
            <QuoteItemDetail
              quote={quote}
              rejectQuote={props.rejectQuote}
              updateQuote={props.updateQuote}
            />
          </section>
        </div>
        <div className="col2">
          <section className="customerContainer">
            <div className="header">Customer Information</div>
            <div className="row">
              <div className="name">Name</div>
              <div className="value">
                {quote.customerName || "Name Not Available"}
              </div>
            </div>
            {Boolean(quote.customerPhone) && (
              <div className="row">
                <div className="name">Phone</div>
                <div className="value">{quote.customerPhone}</div>
              </div>
            )}
          </section>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 1em auto;
          max-width: 1100px;
        }
        .flexContainer {
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-gap: 1em;
        }
        .col1 {
          flex: 1;
        }
        header .id {
          font-size: 1.6rem;
        }
        header {
          margin-bottom: 1em;
        }
        .time {
          color: ${CSSConstants.secondaryTextColor};
        }
        .status {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.5em;
          color: white;
          margin: 0 0.3em;
        }
        .customerContainer {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
        }
        .customerContainer .header {
          font-size: 1.3rem;
          padding: 0.3em 0.8em;
          margin: 0.4em 0;
        }
        .row {
          border-bottom: ${CSSConstants.borderStyle};
        }
        .name {
          padding: 0.8em;
          margin-top: 0.4em;
          font-weight: bold;
        }
        .value {
          padding-bottom: 0.4em;
          padding-left: 0.8em;
          padding-right: 0.8em;
        }
        .backBtn {
          display: inline-block;
          cursor: pointer;
          margin: 1em 0;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  rejectQuote: QuoteActions.rejectQuote,
  updateQuote: QuoteActions.updateQuote,
};

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Quote);
