import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";
import { SelectOptionInterface } from "./product";

interface CreateCouponAction {
  type: typeof CREATE_COUPON_REQUEST;
}

export type CouponActionType = CreateCouponAction;

export interface CouponInterface {
  sellerId: string;
  couponCode: string;
  discountValue: number;
  discountPercentage: number;
  products: CouponProduct[];
  categoryIds: number[];
  ecosystemName: string;
  ecosystemId: string;
}

interface CouponProduct {
  productId: number;
  skuId: string;
}

export interface CouponInputInterface {
  products: CouponProductInputInterface[];
  categories: SelectOptionInterface[];
}

export interface CouponProductInputInterface {
  productId: number;
  skuIds: string[];
}
