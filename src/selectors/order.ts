import { createSelector } from "reselect";
import { RootState } from "../reducers";
import {
  OrderInterface,
  OrderItemInterface,
  OrderStatus,
} from "../types/order";
import _ from "lodash";
import { transformOrderItem } from "../transformers/orderItem";

const getOrders = createSelector(
  (state: RootState) => state.order,
  (order): OrderInterface[] => order.order.data
);

const getOrderItems = createSelector(
  getOrders,
  (orders): OrderItemInterface[] => {
    if (!orders) {
      return null;
    }
    return _.chain(orders)
      .map((order) =>
        order.items.map((orderItem) => transformOrderItem(order, orderItem))
      )
      .flatten()
      .value();
  }
);

const getCancelRequestedOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) => orderItem.orderItemStatus === OrderStatus.CancelRequested
    );
  }
);

const getReturnRequestedOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) => orderItem.orderItemStatus === OrderStatus.ReturnRequested
    );
  }
);

const getCancelledOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) => orderItem.orderItemStatus === OrderStatus.CancelCompleted
    );
  }
);

const getOpenOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) =>
        orderItem.orderItemStatus === OrderStatus.PaymentSuccess ||
        orderItem.orderItemStatus === OrderStatus.PaymentOnDelivery
    );
  }
);

const getCurrentlyProcessingOrderItemIds = createSelector(
  (state: RootState) => state.order,
  (order): number[] => order.currentlyProcessingOrderItemIds
);

export {
  getOrders,
  getOrderItems,
  getCurrentlyProcessingOrderItemIds,
  getCancelRequestedOrderItems,
  getReturnRequestedOrderItems,
  getCancelledOrderItems,
  getOpenOrderItems,
};
