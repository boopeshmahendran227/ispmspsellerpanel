import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { OrderInterface, OrderDetailInterface } from "../types/order";

const getOrders = createSelector(
  (state: RootState) => state.order,
  (order): OrderInterface[] => order.order.data
);

const getCurrentOrder = createSelector(
  (state: RootState) => state.order,
  (order): OrderDetailInterface => order.currentOrder.data
);

export { getOrders, getCurrentOrder };
