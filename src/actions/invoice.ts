import { SET_CURRENT_INVOICE } from "../constants/ActionTypes";
import { InvoiceInterface, InvoiceActionType } from "../types/invoice";

const setCurrentInvoice = (invoice: InvoiceInterface): InvoiceActionType => {
  return {
    type: SET_CURRENT_INVOICE,
    invoice,
  };
};

export default {
  setCurrentInvoice,
};
