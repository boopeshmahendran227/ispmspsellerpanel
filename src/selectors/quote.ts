import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { QuoteInterface } from "../types/quote";

const getCurrentQuote = createSelector(
  (state: RootState) => state.quote,
  (quote): QuoteInterface => quote.currentQuote
);

export { getCurrentQuote };
