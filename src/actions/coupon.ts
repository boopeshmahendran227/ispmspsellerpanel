import { CouponActionType } from "../types/coupon";
import { CREATE_COUPON_REQUEST } from "../constants/ActionTypes";

const createCoupon = (): CouponActionType => {
  return {
    type: CREATE_COUPON_REQUEST,
  };
};

export default {
  createCoupon,
};
