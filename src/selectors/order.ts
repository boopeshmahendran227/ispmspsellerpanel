import { createSelector } from "reselect";
import { RootState } from "../reducers";
import {
  OrderInterface,
  OrderItemInterface,
  OrderStatus,
} from "../types/order";
import _ from "lodash";
import { transformOrderItem } from "../transformers/orderItem";
import { PaginationDataInterface } from "../types/pagination";

const getOrders = createSelector(
  (state: RootState) => state.order,
  (order): OrderInterface[] => order.order.data?.results
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
        orderItem.orderItemStatus !== OrderStatus.CancelRejected &&
        orderItem.orderItemStatus !== OrderStatus.CancelCompleted &&
        orderItem.orderItemStatus !== OrderStatus.ShippingCompleted &&
        orderItem.orderItemStatus !== OrderStatus.ReturnCompleted &&
        orderItem.orderItemStatus !== OrderStatus.ReturnRejected
    );
  }
);

const getDeliveredOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) => orderItem.orderItemStatus === OrderStatus.ShippingCompleted
    );
  }
);

const getReturnedOrderItems = createSelector(
  getOrderItems,
  (orderItems: OrderItemInterface[]): OrderItemInterface[] => {
    if (!orderItems) {
      return null;
    }

    return orderItems.filter(
      (orderItem) => orderItem.orderItemStatus === OrderStatus.ReturnCompleted
    );
  }
);

const getCurrentlyProcessingOrderItemIds = createSelector(
  (state: RootState) => state.order,
  (order): number[] => order.currentlyProcessingOrderItemIds
);

const getCurrentPageNumber = createSelector(
  (state: RootState) => state.order,
  (order): number => order.currentPageNumber
);

const getOrderPaginatedData = createSelector(
  (state: RootState) => state.order,
  (order): PaginationDataInterface =>
    order.order.data || {
      totalItems: 0,
      totalPages: 0,
      currentPageNumber: 0,
      currentPageSize: 0,
    }
);

export {
  getOrders,
  getOrderItems,
  getCurrentlyProcessingOrderItemIds,
  getCancelRequestedOrderItems,
  getReturnRequestedOrderItems,
  getCancelledOrderItems,
  getOpenOrderItems,
  getDeliveredOrderItems,
  getReturnedOrderItems,
  getCurrentPageNumber,
  getOrderPaginatedData,
};
