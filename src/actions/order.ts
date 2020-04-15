import {
  GET_ORDERS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  APPROVE_CANCEL_ORDER_ITEM,
  REJECT_CANCEL_ORDER_ITEM,
  APPROVE_RETURN_ORDER_ITEM,
  REJECT_RETURN_ORDER_ITEM,
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

const approveCancelOrderItem = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: APPROVE_CANCEL_ORDER_ITEM,
    orderId,
    orderItemId,
  };
};

const rejectCancelOrderItem = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: REJECT_CANCEL_ORDER_ITEM,
    orderId,
    orderItemId,
  };
};

const approveReturnOrderItem = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: APPROVE_RETURN_ORDER_ITEM,
    orderId,
    orderItemId,
  };
};

const rejectReturnOrderItem = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: REJECT_RETURN_ORDER_ITEM,
    orderId,
    orderItemId,
  };
};

export default {
  getOrders,
  changeOrderItemStatus,
  changeOrderItemStatusSuccess,
  changeOrderItemStatusFailure,
  approveCancelOrderItem,
  rejectCancelOrderItem,
  approveReturnOrderItem,
  rejectReturnOrderItem,
};
