import {
  UPDATE_CREDITS_REQUEST,
  UPDATE_CREDITS,
} from "../constants/ActionTypes";
import { InvoiceInterface, PaymentMode } from "../types/invoice";
import { CreditActionType } from "../types/credit";

const updateCredits = (invoice: InvoiceInterface): CreditActionType => {
  return {
    type: UPDATE_CREDITS,
    invoice,
  };
};

const updateCreditsRequest = (
  invoiceId: number,
  creditsPaid: number,
  paymentMode: PaymentMode,
  paymentReferenceId: string
): CreditActionType => {
  return {
    type: UPDATE_CREDITS_REQUEST,
    invoiceId,
    creditsPaid,
    paymentMode,
    paymentReferenceId,
  };
};

export default {
  updateCredits,
  updateCreditsRequest,
};
