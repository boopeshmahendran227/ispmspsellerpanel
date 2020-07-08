import { CouponActionType, CouponRequestInterface } from "../types/coupon";
import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";

const createCoupon = (couponData: CouponRequestInterface): CouponActionType => {
  return {
    type: CREATE_COUPON_REQUEST,
    couponData,
  };
};

export default {
  createCoupon,
};
