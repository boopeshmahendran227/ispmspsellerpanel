import { OrderDetailInterface } from "./order";

export interface InvoiceInterface {
  invoiceId: number;
  issueDate: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  amountPending: number;
  status: InvoiceStatus;
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
