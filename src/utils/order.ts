import { splitCamelCase } from "../utils/misc";
import { OrderStatus } from "../types/order";
import CSSConstants from "../constants/CSSConstants";
import { PaymentMode } from "../types/invoice";

const getColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PaymentSuccess:
    case OrderStatus.PaymentOnDelivery:
    case OrderStatus.PackageReadyForCollection:
      return CSSConstants.secondaryTextColor;
    case OrderStatus.Shipping:
    case OrderStatus.ShippingCompleted:
      return CSSConstants.successColor;
    case OrderStatus.CancelRequested:
    case OrderStatus.CancelCompleted:
      return CSSConstants.dangerColor;
    case OrderStatus.ReturnRequested:
    case OrderStatus.ReturnCompleted:
      return CSSConstants.warningColor;
  }

  return CSSConstants.secondaryTextColor;
};

const getOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PaymentSuccess:
    case OrderStatus.PaymentOnDelivery:
      return "Order Created";
    case OrderStatus.Shipping:
      return "Shipping";
    case OrderStatus.ShippingCompleted:
      return "Delivered";
    case OrderStatus.CancelRequested:
      return "Cancel Requested";
    case OrderStatus.CancelCompleted:
      return "Cancelled";
    case OrderStatus.ReturnRequested:
      return "Return Requested";
  }
  return splitCamelCase(status);
};

const getPaymentText = (paymentMode: PaymentMode) => {
  switch (paymentMode) {
    case PaymentMode.Cash:
      return "Cash on Delivery";
    case PaymentMode.Online:
      return "Online Payment";
  }
  return splitCamelCase(paymentMode);
};

const getPaymentModeColor = (paymentMode: PaymentMode) => {
  switch (paymentMode) {
    case PaymentMode.Cash:
      return CSSConstants.warningColor;
    case PaymentMode.Online:
      return CSSConstants.successColor;
  }
  return CSSConstants.primaryColor;
};

const isOpenOrderStatus = (status: OrderStatus) => {
  return (
    status !== OrderStatus.CancelRejected &&
    status !== OrderStatus.CancelCompleted &&
    status !== OrderStatus.ShippingCompleted &&
    status !== OrderStatus.ReturnCompleted &&
    status !== OrderStatus.ReturnRejected
  );
};

const isDeliveredOrderStatus = (status: OrderStatus) => {
  return status === OrderStatus.ShippingCompleted;
};

const isReturnedOrderStatus = (status: OrderStatus) => {
  return status === OrderStatus.ReturnCompleted;
};

const isCancelledOrderStatus = (status: OrderStatus) => {
  return status === OrderStatus.CancelCompleted;
};

const isShippingOrderStatus = (status: OrderStatus) => {
  return status === OrderStatus.Shipping;
};

const isPendingOrderStatus = (status: OrderStatus) => {
  return [
    OrderStatus.PaymentSuccess,
    OrderStatus.PaymentOnDelivery,
    OrderStatus.SellerProcessing,
  ].includes(status);
};

const isCompletedOrderStatus = (currentStatus: OrderStatus) => {
  return [
    OrderStatus.ShippingCompleted,
    OrderStatus.CancelCompleted,
    OrderStatus.CancelAutoApproved,
    OrderStatus.ReturnCompleted,
    OrderStatus.Completed,
  ].includes(currentStatus);
};

export {
  getColor,
  getOrderStatusText,
  getPaymentModeColor,
  getPaymentText,
  isOpenOrderStatus,
  isDeliveredOrderStatus,
  isReturnedOrderStatus,
  isCancelledOrderStatus,
  isShippingOrderStatus,
  isPendingOrderStatus,
  isCompletedOrderStatus,
};
