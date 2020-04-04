import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { OrderInterface } from "../types/order";

const getOrders = createSelector(
  (state: RootState) => state.order,
  (order): OrderInterface[] => order.order.data
);

export { getOrders };
