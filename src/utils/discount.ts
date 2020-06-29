export interface DiscountInterface {
  discountType: DiscountType;
  discountPercentage: number;
  discountAmount: number;
  couponCode?: string;
}

export interface OrderDiscountInterface {
  discountType: DiscountType;
  discountAmount: number;
  couponCode?: string;
  sellerId?: string;
}

export enum DiscountType {
  TierPrice = "TierPrice",
  PartnerDiscount = "PartnerDiscount",
  QuoteDiscount = "QuoteDiscount",
  SellerCoupon = "SellerCoupon",
  SpecialDiscount = "SpecialDiscount",
  LoanDiscount = "LoanDiscount",
  CreditAmount = "CreditAmount",
  PazaToken = "PazaToken",
}

export interface PriceSplit {
  originalPrice: number;
  finalPrice: number;
  discounts: DiscountInterface[];
}

export interface PriceSplitMap {
  [key: string]: PriceSplit;
}
