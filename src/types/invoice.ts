import { OrderDetailInterface } from "./order";
import { SET_CURRENT_INVOICE } from "../constants/ActionTypes";

interface SetCurrentInvoiceAction {
  type: typeof SET_CURRENT_INVOICE;
  invoice: InvoiceInterface;
}

export type InvoiceActionType = SetCurrentInvoiceAction;

export interface InvoiceInterface {
  invoiceId: number;
  issuedDate: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  creditAmountPending: number;
  status: InvoiceStatus;
  orderItemId: number;
}

export interface InvoiceDetailInterface {
  invoiceId: number;
  invoiceNumber: string;
  order: OrderDetailInterface;
  businessDetails: {
    name: string;
    gstin: string;
    cin: string;
    tan: string;
    pan: string;
    phone: string;
    mobile: string;
    email: string;
  };
  businessAddress: {
    aptno: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    country: string;
    code: string;
  };
}

export enum InvoiceStatus {
  Draft = "Draft",
  Issued = "Issued",
  Pending = "Pending",
  Paid = "Paid",
  Partial = "Partial",
  Overdue = "Overdue",
  Cancelled = "Cancelled",
}

export enum PaymentMode {
  Cash = "Cash",
  Online = "Online",
  PazaWallet = "PazaWallet",
}
