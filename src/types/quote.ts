import {
  ACCEPT_QUOTE_REQUEST,
  REJECT_QUOTE_REQUEST,
  SET_CURRENT_QUOTE,
  UPDATE_QUOTE,
  UPDATE_QUOTE_REQUEST,
} from "../constants/ActionTypes";

export interface ProductDetailQuoteInterface {
  id: number;
  productId: number;
  productDetails: {
    name: string;
    averageRating: number;
    imageRelativePaths: string[];
    attributeValueIds: [
      {
        attributeId: number;
        valueId: number;
        attributeName: string;
        value: string;
      }
    ];
  };
  skuId: string;
  price: number;
  qty: number;
  updatedQuote?: {
    unitPrice: number;
    totalDiscountedPrice: number;
  };
}

export interface QuoteInterface {
  id: number;
  customerId: string;
  sellerName: string;
  sellerId: string;
  productDetails: ProductDetailQuoteInterface[];
  createdDateTime: string;
  status: QuoteStatus;
  statusHistories: QuoteStatusHistoryItem[];
}

export interface QuoteStatusHistoryItem {
  quoteStatusId: QuoteStatus;
  status: string;
  createdDateTime: string;
}

interface RejectQuoteAction {
  type: typeof REJECT_QUOTE_REQUEST;
  quoteId: number;
}

interface UpdateQuoteAction {
  type: typeof UPDATE_QUOTE;
  quote: QuoteInterface;
}

interface UpdateQuoteRequestAction {
  type: typeof UPDATE_QUOTE_REQUEST;
  quoteId: number;
  items: QuoteItemUpdate[];
}

interface SetCurrentQuoteAction {
  type: typeof SET_CURRENT_QUOTE;
  quote: QuoteInterface;
}

export interface QuoteItemUpdate {
  productId: number;
  skuId: string;
  finalTotalPrice: number;
}

export type QuoteActionType =
  | RejectQuoteAction
  | UpdateQuoteAction
  | UpdateQuoteRequestAction
  | SetCurrentQuoteAction;

export enum QuoteStatus {
  Created = "Created",
  Rejected = "Rejected",
  SellerResponsePending = "SellerResponsePending",
  SellerResponded = "SellerResponded",
  Converted = "Converted",
  Expired = "Expired",
}
