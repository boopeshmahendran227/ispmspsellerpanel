import {
  GET_ORDERS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  GET_CURRENT_ORDER_DETAIL_REQUEST,
} from "../constants/ActionTypes";
import { OrderActionType } from "../types/order";

const getOrders = (): OrderActionType => {
  return {
    type: GET_ORDERS_REQUEST,
  };
};

const changeOrderItemStatus = (
  orderItemId: number,
  orderItemStatus: string
): OrderActionType => {
  return {
    type: CHANGE_ORDER_ITEM_STATUS_REQUEST,
    orderItemId,
    orderItemStatus,
  };
};

const getCurrentOrder = (): OrderActionType => {
  return {
    type: GET_CURRENT_ORDER_DETAIL_REQUEST,
  };
};

export default {
  getOrders,
  changeOrderItemStatus,
  getCurrentOrder,
};
