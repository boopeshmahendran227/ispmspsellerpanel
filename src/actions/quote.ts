import { GET_QUOTES_REQUEST } from "../constants/ActionTypes";
import { QuoteActionType } from "../types/quote";

const getQuotes = (): QuoteActionType => {
  return {
    type: GET_QUOTES_REQUEST
  };
};

export default {
  getQuotes
};
