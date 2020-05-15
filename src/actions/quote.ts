import {
  ACCEPT_QUOTE_REQUEST,
  UPDATE_QUOTE_REQUEST,
  REJECT_QUOTE_REQUEST,
} from "../constants/ActionTypes";
import { QuoteActionType } from "../types/quote";

const acceptQuote = (quoteId: number): QuoteActionType => {
  return {
    type: ACCEPT_QUOTE_REQUEST,
    quoteId,
  };
};

const updateQuote = (quoteId: number): QuoteActionType => {
  return {
    type: UPDATE_QUOTE_REQUEST,
    quoteId,
  };
};

const rejectQuote = (quoteId: number): QuoteActionType => {
  return {
    type: REJECT_QUOTE_REQUEST,
    quoteId,
  };
};

export default {
  acceptQuote,
  updateQuote,
  rejectQuote,
};
