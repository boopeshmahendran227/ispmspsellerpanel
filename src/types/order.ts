import { GET_ORDERS_REQUEST } from "../constants/ActionTypes";
import { ProductAttributeValue } from "./product";

export interface OrderItemInterface {
  id: number;
  productId: number;
  skuId: string;
  sellerId: number;
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

export type OrderActionType = GetOrderAction;
