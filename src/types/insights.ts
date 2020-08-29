import { OrderStatus } from "./order";

export interface SummaryInterface {
  orderCount: Record<OrderStatus, number>;
  totalOrderCount: number;
  totalRevenue: number;
  totalQuotes: number;
  totalCustomers: number;
}
