import {
  UPDATE_CREDITS_REQUEST,
  UPDATE_CREDITS,
} from "../constants/ActionTypes";
import { InvoiceInterface } from "../types/invoice";
import { CreditActionType } from "../types/credit";

const updateCredits = (invoice: InvoiceInterface): CreditActionType => {
  return {
    type: UPDATE_CREDITS,
    invoice,
  };
};

const updateCreditsRequest = (
  invoiceId: number,
  creditsPaid: number
): CreditActionType => {
  return {
    type: UPDATE_CREDITS_REQUEST,
    invoiceId,
    creditsPaid,
  };
};

export default {
  updateCredits,
  updateCreditsRequest,
};
