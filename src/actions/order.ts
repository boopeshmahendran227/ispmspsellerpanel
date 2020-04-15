import {
  GET_ORDERS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
} from "../constants/ActionTypes";
import { OrderActionType } from "../types/order";

const getOrders = (): OrderActionType => {
  return {
    type: GET_ORDERS_REQUEST,
  };
};

const changeOrderItemStatus = (
  orderId: number,
  orderItemId: number,
  orderItemStatus: string
): OrderActionType => {
  return {
    type: CHANGE_ORDER_ITEM_STATUS_REQUEST,
    orderId,
    orderItemId,
    orderItemStatus,
  };
};

const changeOrderItemStatusSuccess = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: CHANGE_ORDER_ITEM_STATUS_SUCCESS,
    orderId,
    orderItemId,
  };
};

const changeOrderItemStatusFailure = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: CHANGE_ORDER_ITEM_STATUS_FAILURE,
    orderId,
    orderItemId,
  };
};

export default {
  getOrders,
  changeOrderItemStatus,
  changeOrderItemStatusSuccess,
  changeOrderItemStatusFailure,
};
