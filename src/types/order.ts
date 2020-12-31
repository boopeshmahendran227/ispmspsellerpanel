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
import { ProductAttributeValue } from "./product";
import { OrderDiscountInterface } from "../types/discount";
import { PaymentMode } from "./invoice";
import { StatusType } from "components/atoms/StatusBar";

export enum OrderStatusFilter {
  AllOrderItems,
  OpenOrderItems,
  DeliveredOrderItems,
  CancelledOrderItems,
  ReturnedOrderItems,
}

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
  productId: number;
  skuId: string;
  sellerId: string;
  sellerName: string;
  actualPrice: number;
  actualUnitPrice: number;
  actualUnitPriceWithoutTax: number;
  actualPriceWithoutTax: number;
  itemPrice: number;
  discountedPrice: number;
  isSelfPickup: boolean;
  productSnapshot: {
    productName: string;
    images: string[];
    attributeValues: ProductAttributeValue[];
    externalId: string;
    discountSplit: {
      [key: string]: number;
    };
  };
  totalDiscount: number;
  qty: number;
  tax: number;
  bundleId: number;
  shipmentId: number;
  orderItemStatusHistories: OrderStatusHistoryItem[];
  orderItemStatus: OrderStatus;
  loanDetail: {
    loanAmountChosen: number;
    loanProcessingFee: number;
    providerName: string;
  };
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
    expectedDeliveryDate: string;
    trackingCode: string;
    shiprocketResponse?: {
      awb_code: string;
      label_url: string;
      manifest_url: string;
      pickup_scheduled_date: string;
      pickup_token_number: string;
    };
  };
  createdDateTime: string;
}

export interface TransformedOrderItemInterface extends OrderItemInterface {
  order: OrderInterface;
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

export enum PayoutStatus {
  Created = "Created",
  Processing = "Processing",
  Paid = "Paid",
  Error = "Error",
  Hold = "Hold",
}

export interface AdvancePaymentMetadata {
  amountPaid: number;
  referenceId?: string;
  payoutStatus: PayoutStatus;
  orderStatus: number;
  orderStateStr: string;
  createdTime: string;
  updatedTime: string;
}

export interface ManufactureMetadata {
  amountPaid: number;
  payment: AdvancePaymentMetadata[];
}

export enum OrderType {
  Regular = "Regular",
  Manufacturing = "Manufacturing",
}

export interface OrderInterface {
  id: number;
  customerId: string;
  customerName: string;
  customerPhone: string;
  totalPrice: number;
  totalDiscount: number;
  totalTax: number;
  items: OrderItemInterface[];
  paymentSplits: [
    {
      id: number;
      paymentMode: PaymentMode;
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
  orderType: OrderType;
  orderMetadata?: {
    quoteId: number;
    shipmentFee: number;
    isBusiness: boolean;
    nbfcCreditSettled?: boolean;
    manufactureMetadata: ManufactureMetadata;
  };
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

interface MarkPackageReadyForCollectionAction {
  type: typeof MARK_PACKAGE_READY_FOR_COLLECTION;
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

export type OrderActionType =
  | ChangeOrderItemStatusAction
  | ChangeOrderItemStatusSuccessAction
  | ChangeOrderItemStatusFailureAction
  | ApproveCancelOrderItemAction
  | RejectCancelOrderItemAction
  | ApproveReturnOrderItemAction
  | RejectReturnOrderItemAction
  | MarkAsShippingCompleteAction
  | MarkAsShippingAction
  | MarkPackageReadyForCollectionAction
  | MarkAsProcessingAction
  | CancelOrderItemAction;
