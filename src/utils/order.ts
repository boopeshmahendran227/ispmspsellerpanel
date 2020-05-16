import { splitCamelCase } from "../utils/misc";
import { OrderStatus } from "../types/order";
import CSSConstants from "../constants/CSSConstants";

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
      return "Pending";
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

export { getColor, getOrderStatusText };
