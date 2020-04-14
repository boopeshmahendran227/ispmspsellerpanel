import {
  GET_ORDERS_REQUEST,
  CHANGE_ORDER_ITEM_STATUS_REQUEST,
} from "../constants/ActionTypes";
import { ProductAttributeValue } from "./product";

export enum OrderStatus {
  Created = "Created",
  PaymentSuccess = "PaymentSuccess",
  PaymentFail = "PaymentFail",
  SellerApprovalPending = "SellerApprovalPending",
  AdminApprovalPending = "AdminApprovalPending",
  Shipping = "Shipping",
  ShippingCompleted = "ShippingCompleted",
  CancelRequested = "CancelRequested",
  Cancel = "Cancel",
  CancelCompleted = "CancelCompleted",
  Return = "Return",
  ReturnComplete = "ReturnComplete",
}

export interface OrderItemInterface {
  id: number;
  productId: number;
  skuId: string;
  sellerId: string;
  actualPrice: number;
  discountedPrice: number;
  productSnapshot: {
    productName: string;
    images: string[];
    attributeValues: ProductAttributeValue[];
  };
  totalDiscount: number;
  qty: number;
  tax: number;
  bundleId: number;
  shipmentId: number;
  orderItemStatusHistories: [
    {
      id: number;
      orderStatus: string;
      createdDateTime: string;
    }
  ];
  orderItemStatus: string;
}

export interface AddressInterface {
  id: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  isoCountryCode: string;
  zipCode: string;
}

export interface OrderInterface {
  id: number;
  customerId: string;
  totalPrice: number;
  totalDiscount: number;
  items: OrderItemInterface[];
  paymentSplits: [
    {
      id: number;
      paymentMode: string;
      price: number;
    }
  ];
  orderStatus: string;
  orderStatusHistories: [
    {
      id: number;
      orderStatus: string;
      createdDateTime: string;
    }
  ];
  createdDateTime: string;
}

export interface OrderDetailInterface extends OrderInterface {
  billingAddress: AddressInterface;
  shippingAddress: AddressInterface;
}

interface GetOrderAction {
  type: typeof GET_ORDERS_REQUEST;
}

interface ChangeOrderItemStatusAction {
  type: typeof CHANGE_ORDER_ITEM_STATUS_REQUEST;
  orderId: number;
  orderItemId: number;
  orderItemStatus: string;
}

export type OrderActionType = GetOrderAction | ChangeOrderItemStatusAction;
