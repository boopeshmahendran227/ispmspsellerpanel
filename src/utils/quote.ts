import { QuoteStatus } from "../types/quote";
import CSSConstants from "../constants/CSSConstants";
import { splitCamelCase } from "./misc";

const getQuoteStatusText = (status: QuoteStatus) => {
  switch (status) {
    case QuoteStatus.SellerResponsePending:
      return "Pending";
    case QuoteStatus.SellerResponded:
      return "Responded";
    case QuoteStatus.Converted:
      return "Converted";
    case QuoteStatus.Rejected:
      return "Rejected";
    case QuoteStatus.Expired:
      return "Expired";
  }
  return splitCamelCase(status);
};

const getColor = (status: QuoteStatus) => {
  switch (status) {
    case QuoteStatus.Created:
      return "#aaa";
    case QuoteStatus.SellerResponsePending:
      return "#aaa";
    case QuoteStatus.Converted:
      return CSSConstants.successColor;
    case QuoteStatus.Rejected:
      return CSSConstants.dangerColor;
  }
};

export { getQuoteStatusText, getColor };
