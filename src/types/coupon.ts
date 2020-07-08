import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";
import { SelectOptionInterface } from "./product";

export interface CreateCouponAction {
  type: typeof CREATE_COUPON_REQUEST;
  couponData: CouponRequestInterface;
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

export interface CouponRequestInterface {
  discountValue?: number;
  discountPercentage?: number;
  products?: CouponProduct[];
  categoryIds?: number[];
}

export interface CouponInputInterface {
  type: CouponType;
  discountValue: number;
  discountPercentage: number;
  products: CouponProductInputInterface[];
  categories: SelectOptionInterface[];
}

export interface CouponProductInputInterface {
  productId: number;
  skuIds: string[];
}

export enum CouponType {
  Percentage = "Percentage",
  FixedAmount = "FixedAmount",
}
