export interface Promotion {
  uuidpromotion: string;
  promotionname: string;
  initialdate: string;
  duedate: string;
  state: string;
}

export interface DiscountPromotion {
  UuidPromotion?: string;
  Discount?: number;
}

export interface FreeShippingPromotion {
  UuidPromotion: string;
  FreeShipping: boolean;
}

export interface PartnerPromotions {
  UUIDPartner?: string;
  DiscountPromotion?: DiscountPromotion;
  FreeShippingPromotion?: FreeShippingPromotion;
}

export interface CartPromotions {
  CartPromotion?: DiscountPromotion;
  PartnerPromotions?: PartnerPromotions[];
}
