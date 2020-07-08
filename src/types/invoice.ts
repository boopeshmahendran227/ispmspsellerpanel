export interface InvoiceInterface {
  invoiceId: number;
  issueDate: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  amountPending: number;
  status: InvoiceStatus;
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
