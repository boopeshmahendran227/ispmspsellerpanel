import {
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
  MARK_AS_PROCESSING,
  MARK_PACKAGE_READY_FOR_COLLECTION,
} from "../constants/ActionTypes";
import { OrderActionType } from "../types/order";

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

const markPackageReadyForCollection = (
  orderId: number,
  orderItemId: number
): OrderActionType => {
  return {
    type: MARK_PACKAGE_READY_FOR_COLLECTION,
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

export default {
  changeOrderItemStatus,
  changeOrderItemStatusSuccess,
  changeOrderItemStatusFailure,
  approveCancelOrderItem,
  rejectCancelOrderItem,
  approveReturnOrderItem,
  rejectReturnOrderItem,
  markAsShippingComplete,
  markAsShipping,
  markPackageReadyForCollection,
  markAsProcessing,
  cancelOrderItem,
};
