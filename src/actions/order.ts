import {
  GET_ORDERS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_SUCCESS,
  CHANGE_ORDER_ITEM_STATUS_FAILURE,
  APPROVE_CANCEL_ORDER_ITEM,
  REJECT_CANCEL_ORDER_ITEM,
  APPROVE_RETURN_ORDER_ITEM,
  REJECT_RETURN_ORDER_ITEM,
  MARK_AS_SHIPPING_COMPLETE,
  MARK_AS_SHIPPING,
  CANCEL_ORDER_ITEM,
  SET_ORDER_CURRENT_PAGE_NUMBER,
  MARK_AS_PROCESSING,
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
  orderItemStatus: string,
  reason: string = "",
  deliveryCode: string = ""
): OrderActionType => {
  return {
    type: CHANGE_ORDER_ITEM_STATUS_REQUEST,
    orderId,
    orderItemId,
    orderItemStatus,
    reason,
    deliveryCode,
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

const markAsShippingComplete = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: MARK_AS_SHIPPING_COMPLETE,
    orderId,
    orderItemId,
  };
};

const markAsShipping = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: MARK_AS_SHIPPING,
    orderId,
    orderItemId,
  };
};

const markAsProcessing = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: MARK_AS_PROCESSING,
    orderId,
    orderItemId,
  };
};

const cancelOrderItem = (
  orderId: number,
  orderItemId: number,
  reason: string = ""
): OrderActionType => {
  return {
    type: CANCEL_ORDER_ITEM,
    orderId,
    orderItemId,
    reason,
  };
};

const setOrderCurrentPageNumber = (value: number): OrderActionType => {
  return {
    type: SET_ORDER_CURRENT_PAGE_NUMBER,
    value,
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
  markAsShippingComplete,
  markAsShipping,
  markAsProcessing,
  cancelOrderItem,
  setOrderCurrentPageNumber,
};
