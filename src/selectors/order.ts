import { createSelector } from "reselect";
import { RootState } from "../reducers";
import {
  OrderInterface,
  OrderItemInterface,
  OrderStatus,
} from "../types/order";
import _ from "lodash";

const getOrders = createSelector(
  (state: RootState) => state.order,
  (order): OrderInterface[] => order.order.data
);

const getCancelRequestedOrderItems = createSelector(
  getOrders,
  (orders: OrderInterface[]): OrderItemInterface[] => {
    if (!orders) {
      return null;
    }

    return _.chain(orders)
      .map((order) =>
        order.items
          .filter(
            (orderItem: OrderItemInterface) =>
              orderItem.orderItemStatus === OrderStatus.CancelRequested
          )
          .map((orderItem) => ({ ...orderItem, order }))
      )
      .flatten()
      .value();
  }
);

export { getOrders, getCancelRequestedOrderItems };
