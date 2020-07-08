import {
  UPDATE_CREDITS_REQUEST,
  UPDATE_CREDITS,
} from "../constants/ActionTypes";
import { InvoiceInterface } from "./invoice";

interface UpdateCreditsAction {
  type: typeof UPDATE_CREDITS;
  invoice: InvoiceInterface;
}

export interface UpdateCreditsRequestAction {
  type: typeof UPDATE_CREDITS_REQUEST;
  invoiceId: number;
  creditsPaid: number;
}

export type CreditActionType = UpdateCreditsAction | UpdateCreditsRequestAction;
