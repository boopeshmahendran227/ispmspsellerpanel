import {
  ACCEPT_QUOTE_REQUEST,
  REJECT_QUOTE_REQUEST,
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

interface AcceptQuoteAction {
  type: typeof ACCEPT_QUOTE_REQUEST;
  quoteId: number;
}

interface RejectQuoteAction {
  type: typeof REJECT_QUOTE_REQUEST;
  quoteId: number;
}

interface UpdateQuoteAction {
  type: typeof UPDATE_QUOTE_REQUEST;
  quoteId: number;
}

export type QuoteActionType =
  | AcceptQuoteAction
  | RejectQuoteAction
  | UpdateQuoteAction;

export enum QuoteStatus {
  Created = "Created",
  Rejected = "Rejected",
  SellerResponsePending = "SellerResponsePending",
  SellerResponded = "SellerResponded",
  Converted = "Converted",
  Expired = "Expired",
}
