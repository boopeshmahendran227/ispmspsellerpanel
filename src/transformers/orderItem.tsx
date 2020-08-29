import { OrderInterface, TransformedOrderItemInterface } from "../types/order";

const transformOrderItem = (
  order: OrderInterface,
  orderItem
): TransformedOrderItemInterface => {
  return {
    ...orderItem,
    order,
  };
};

export { transformOrderItem };
