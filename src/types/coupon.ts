import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";

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
  ecosystemName: string;
  ecosystemId: string;
  minimumOrderAmount: number;
  startDate: string;
  endDate: string;
}

export interface CouponRequestInterface {
  discountValue?: number;
  discountPercentage?: number;
  minimumOrderAmount: number;
  startDate: string;
  endDate: string;
}

export interface CouponInputInterface {
  type: CouponType;
  discountValue: number;
  discountPercentage: number;
  minimumOrderAmount: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export interface CouponProductInputInterface {
  productId: number;
  skuIds: string[];
}

export enum CouponType {
  Percentage = "Percentage",
  FixedAmount = "FixedAmount",
}
