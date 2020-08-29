import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { InvoiceInterface } from "../types/invoice";

const getCurrentInvoice = createSelector(
  (state: RootState) => state.invoice,
  (invoice): InvoiceInterface | null => invoice.currentInvoice
);

export { getCurrentInvoice };
