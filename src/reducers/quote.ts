import { combineReducers } from "redux";
import { SET_CURRENT_QUOTE } from "../constants/ActionTypes";
import { QuoteInterface, QuoteActionType } from "../types/quote";

const getCurrentQuote = (
  state: QuoteInterface | null = null,
  action: QuoteActionType
) => {
  switch (action.type) {
    case SET_CURRENT_QUOTE:
      return action.quote;
  }
  return state;
};

export default combineReducers({
  currentQuote: getCurrentQuote,
});
