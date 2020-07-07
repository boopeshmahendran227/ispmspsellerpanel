export interface InvoiceInterface {
  invoiceId: number;
  issueDate: string;
  customerId: string;
  customerName: string;
  totalAmount: number;
  amountPending: number;
  status:StatusType ;
}

export enum StatusType {
  draft = "Draft",
  issued = "Issued",
  pending = "Pending",
  paid = "Paid",
  partial = "Partial",
  overdue = "Overdue",
  cancelled = "Cancelled",
}