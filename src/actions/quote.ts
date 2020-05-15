import {
  ACCEPT_QUOTE_REQUEST,
  REJECT_QUOTE_REQUEST,
  UPDATE_QUOTE,
  SET_CURRENT_QUOTE,
  UPDATE_QUOTE_REQUEST,
} from "../constants/ActionTypes";
import {
  QuoteActionType,
  QuoteInterface,
  QuoteItemUpdate,
} from "../types/quote";

const acceptQuote = (quoteId: number): QuoteActionType => {
  return {
    type: ACCEPT_QUOTE_REQUEST,
    quoteId,
  };
};

const updateQuote = (quote: QuoteInterface): QuoteActionType => {
  return {
    type: UPDATE_QUOTE,
    quote,
  };
};

const updateQuoteRequest = (
  quoteId: number,
  items: QuoteItemUpdate[]
): QuoteActionType => {
  return {
    type: UPDATE_QUOTE_REQUEST,
    quoteId,
    items,
  };
};

const rejectQuote = (quoteId: number): QuoteActionType => {
  return {
    type: REJECT_QUOTE_REQUEST,
    quoteId,
  };
};

const setCurrentQuote = (quote: QuoteInterface): QuoteActionType => {
  return {
    type: SET_CURRENT_QUOTE,
    quote,
  };
};

export default {
  acceptQuote,
  updateQuote,
  rejectQuote,
  setCurrentQuote,
  updateQuoteRequest,
};
