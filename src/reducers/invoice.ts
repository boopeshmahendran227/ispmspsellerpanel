import { combineReducers } from "redux";
import { SET_CURRENT_INVOICE } from "../constants/ActionTypes";
import { InvoiceInterface, InvoiceActionType } from "../types/invoice";

const getCurrentInvoice = (
  state: InvoiceInterface = null,
  action: InvoiceActionType
) => {
  switch (action.type) {
    case SET_CURRENT_INVOICE:
      return action.invoice;
  }
  return state;
};

export default combineReducers({
  currentInvoice: getCurrentInvoice,
});
