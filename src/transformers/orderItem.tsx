import { OrderItemInterface } from "../types/order";

const transformOrderItem = (order, orderItem): OrderItemInterface => {
  return {
    ...orderItem,
    order,
    finalPrice:
      orderItem.actualUnitPrice * orderItem.qty - orderItem.totalDiscount,
  };
};

export { transformOrderItem };
