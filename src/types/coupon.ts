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
