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
    case QuoteStatus.SellerRejected:
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
      return "secondaryTextColor.500";
    case QuoteStatus.SellerResponsePending:
      return "secondaryTextColor.500";
    case QuoteStatus.SellerResponded:
      return "successColor.500";
    case QuoteStatus.Converted:
      return "successColor.500";
    case QuoteStatus.SellerRejected:
    case QuoteStatus.Rejected:
      return "dangerColor.500";
  }
};

export { getQuoteStatusText, getColor };
