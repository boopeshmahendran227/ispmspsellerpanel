import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";

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
