import { OrderItemInterface } from "../types/order";

const transformOrderItem = (order, orderItem): OrderItemInterface => {
  return {
    ...orderItem,
    order,
  };
};

export { transformOrderItem };
