import {
  GET_FILTERED_ORDERS_REQUEST,
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
  UPDATE_SHIPPING_INFORMATION_REQUEST,
  SET_ECOSYSTEM_FILTER_FOR_ORDERS,
} from "../constants/ActionTypes";
import { ProductAttributeValue } from "./product";
import { OrderDiscountInterface } from "../types/discount";

export enum OrderStatus {
  Created = "Created",
  PaymentSuccess = "PaymentSuccess",
  PaymentFail = "PaymentFail",
  SellerProcessing = "SellerProcessing",
  SellerApprovalPending = "SellerApprovalPending",
  AdminApprovalPending = "AdminApprovalPending",
  Shipping = "Shipping",
  ShippingCompleted = "ShippingCompleted",
  CancelRequested = "CancelRequested",
  CancelCompleted = "CancelCompleted",
  CancelRejected = "CancelRejected",
  ReturnRequested = "ReturnRequested",
  ReturnCompleted = "ReturnCompleted",
  ReturnRejected = "ReturnRejected",
  PartialCancelRequested = "PartialCancelRequested",
  PartialCancelCompleted = "PartialCancelCompleted",
  Completed = "Completed",
  PaymentOnDelivery = "PaymentOnDelivery",
  CancelAutoApproved = "CancelAutoApproved",
  PartialReturnRequested = "PartialReturnRequested",
  PartialReturnCompleted = "PartialReturnCompleted",
  PackageReadyForCollection = "PackageReadyForCollection",
  Abandoned = "Abandoned",
}

export interface OrderItemInterface {
  id: number;
  order?: OrderInterface;
  productId: number;
  skuId: string;
  sellerId: string;
  sellerName: string;
  actualUnitPrice: number;
  actualPriceWithoutTax: number;
  discountedPrice: number;
  productSnapshot: {
    productName: string;
    images: string[];
    attributeValues: ProductAttributeValue[];
    externalId: string;
  };
  totalDiscount: number;
  qty: number;
  tax: number;
  bundleId: number;
  shipmentId: number;
  orderItemStatusHistories: OrderStatusHistoryItem[];
  orderItemStatus: OrderStatus;
  taxDetails: {
    taxGroupId: number;
    taxGroupName: string;
    totalTaxPaid: number;
    taxSplits: [
      {
        taxAmount: number;
        taxAmountPaid: number;
        taxId: number;
        taxName: string;
        taxPercentage: number;
      }
    ];
  };
  metadata: {
    deliveryCode?: string;
    shipmentFeePerSeller: number;
  };
  shipment: {
    id: number;
    providerName: string;
    shipmentFee: number;
  };
  createdDateTime: string;
}

export interface OrderStatusHistoryItem {
  id: number;
  orderStatus: OrderStatus;
  createdDateTime: string;
}

export interface AddressInterface {
  id?: string;
  apartmentNumber: string;
  street: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  isoCountryCode: string;
  zipCode: string;
}

export interface OrderInterface {
  id: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
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
  orderStatus: OrderStatus;
  orderStatusHistories: [
    {
      id: number;
      orderStatus: OrderStatus;
      createdDateTime: string;
    }
  ];
  createdDateTime: string;
  metadata: {
    quoteId: number;
    shipmentFee: number;
  };
  discountSplits: OrderDiscountInterface[];
}

export interface OrderDetailInterface extends OrderInterface {
  billingAddress: AddressInterface;
  shippingAddress: AddressInterface;
}

export interface OrderItemCountMap {
  [key: string]: {
    orderCount: number;
    qty: number;
  };
}

export interface ProductOrderInterface {
  productId: number;
  productName: string;
  skuId: string;
  imagePath: string;
  orderItemCount: OrderItemCountMap;
  externalId: string;
}

interface GetFilteredOrdersAction {
  type: typeof GET_FILTERED_ORDERS_REQUEST;
}

interface ChangeOrderItemStatusAction {
  type: typeof CHANGE_ORDER_ITEM_STATUS_REQUEST;
  orderId: number;
  orderItemId: number;
  orderItemStatus: string;
  reason: string;
  deliveryCode: string;
}

interface ChangeOrderItemStatusSuccessAction {
  type: typeof CHANGE_ORDER_ITEM_STATUS_SUCCESS;
  orderId: number;
  orderItemId: number;
}

interface ChangeOrderItemStatusFailureAction {
  type: typeof CHANGE_ORDER_ITEM_STATUS_FAILURE;
  orderId: number;
  orderItemId: number;
}

interface ApproveCancelOrderItemAction {
  type: typeof APPROVE_CANCEL_ORDER_ITEM;
  orderId: number;
  orderItemId: number;
}

interface RejectCancelOrderItemAction {
  type: typeof REJECT_CANCEL_ORDER_ITEM;
  orderId: number;
  orderItemId: number;
}

interface ApproveReturnOrderItemAction {
  type: typeof APPROVE_RETURN_ORDER_ITEM;
  orderId: number;
  orderItemId: number;
}

interface RejectReturnOrderItemAction {
  type: typeof REJECT_RETURN_ORDER_ITEM;
  orderId: number;
  orderItemId: number;
}

interface MarkAsShippingCompleteAction {
  type: typeof MARK_AS_SHIPPING_COMPLETE;
  orderId: number;
  orderItemId: number;
}

interface MarkAsShippingAction {
  type: typeof MARK_AS_SHIPPING;
  orderId: number;
  orderItemId: number;
}

interface MarkAsProcessingAction {
  type: typeof MARK_AS_PROCESSING;
  orderId: number;
  orderItemId: number;
}

interface CancelOrderItemAction {
  type: typeof CANCEL_ORDER_ITEM;
  orderId: number;
  orderItemId: number;
  reason: string;
}

interface SetOrderCurrentPageNumberAction {
  type: typeof SET_ORDER_CURRENT_PAGE_NUMBER;
  value: number;
}

interface UpdateShippingInformationAction {
  type: typeof UPDATE_SHIPPING_INFORMATION_REQUEST;
  orderItemId: number;
  providerName: string;
  trackingCode: string;
  expectedDeliveryDate: string;
}

interface SetEcosystemFilterAction {
  type: typeof SET_ECOSYSTEM_FILTER_FOR_ORDERS;
  ecosystemId: string;
}

export type OrderActionType =
  | GetFilteredOrdersAction
  | ChangeOrderItemStatusAction
  | ChangeOrderItemStatusSuccessAction
  | ChangeOrderItemStatusFailureAction
  | ApproveCancelOrderItemAction
  | RejectCancelOrderItemAction
  | ApproveReturnOrderItemAction
  | RejectReturnOrderItemAction
  | MarkAsShippingCompleteAction
  | MarkAsShippingAction
  | MarkAsProcessingAction
  | CancelOrderItemAction
  | SetOrderCurrentPageNumberAction
  | UpdateShippingInformationAction
  | SetEcosystemFilterAction;
