import { GET_QUOTES_REQUEST } from "../constants/ActionTypes";

interface GetQuotesAction {
  type: typeof GET_QUOTES_REQUEST;
}

export type QuoteActionType = GetQuotesAction;

interface ProductDetailQuoteInterface {
  id: number;
  productId: number;
  productDetails: {
    name: string;
    averageRating: number;
    imageRelativePaths: string[];
  };
  skuId: string;
  price: number;
  qty: number;
}

export interface QuoteInterface {
  customerId: string;
  sellerName: string;
  sellerId: string;
  productDetails: ProductDetailQuoteInterface[];
  message: string;
  createdDateTime: string;
}
