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
  ecosystemId: string;
  couponCode: string;
}

export interface CouponInputInterface {
  couponCode: string;
  type: CouponType;
  discountValue: number;
  discountPercentage: number;
  minimumOrderAmount: number;
  startDate: moment.Moment;
  endDate: moment.Moment;
  ecosystem?: SelectOptionInterface | null;
}

export interface CouponProductInputInterface {
  productId: number;
  skuIds: string[];
}

export enum CouponType {
  Percentage = "Percentage",
  FixedAmount = "FixedAmount",
}
