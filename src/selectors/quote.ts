import { RootState } from "../reducers";
import { QuoteInterface } from "../types/quote";
import { createSelector } from "reselect";

const getQuotes = createSelector(
  (state: RootState) => state.quote,
  (quote): QuoteInterface[] => quote.quote.data
);

export { getQuotes };
