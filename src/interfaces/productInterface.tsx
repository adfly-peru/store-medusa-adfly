export interface Attribute {
  attributeName: string;
  values: string[];
}

export interface OfferAttribute {
  attributeName: string;
  attribute: Attribute;
}

export interface VariantAttribute {
  attributeName: string;
  value: string;
}

export interface Product {
  specification?: string;
  condition: string;
  conditionDetails?: string;
  productWarranty?: string;
  sellerWarranty?: string;
  included?: string;
  width?: number;
  height?: number;
  weight?: number;
  length?: number;
}

export interface Coupon {
  initialDate: string;
  expirationDate: string;
  initialPurchaseDate: string;
  expirationPurchaseDate: string;
  couponUsage: string;
  couponContent: string;
  discountType: string;
  discount: number;
  couponCode: string;
}

export interface Service {
  initialDate: string;
  expirationDate: string;
  initialPurchaseDate: string;
  expirationPurchaseDate: string;
  accessService: string;
  contentService: string;
  couponCode: string;
}

export interface Variant {
  uuidVariant: string;
  attributes: VariantAttribute[];
  currency: string;
  stock: number;
  refPrice: number;
  adflyPrice: number;
  offerPrice?: number;
  maxQuantity: number;
  purchasePeriod?: string;
  imageURL: string;
  variantSku: string;
  product?: Product;
  coupon?: Coupon;
  service?: Service;
  additionalimages: string[];
}

export interface VariantDetailed {
  uuidVariant: string;
  attributes: VariantAttribute[];
  currency: string;
  stock: number;
  totalStock: number;
  refPrice: number;
  adflyPrice: number;
  offerPrice?: number;
  maxQuantity?: number;
  imageURL: string;
  variantSku?: string;
  totalLastPeriod?: number;
  offer: {
    uuidOffer: string;
    offerName: string;
    description: string;
    type: string;
    termConditions: string;
    uuiddepartment?: string;
    uuidcampaign?: string;
  };
  service?: Service;
}

export interface OfferForCollaborator {
  offer: Offer;
  totalLastPeriod: number;
  lastcoupon?: string;
}

export interface OfferDetails {
  refPrice: number;
  adflyPrice: number;
  offerPrice: number;
  imageURL: string;
  discountType?: string;
  discount?: number;
}

export interface Offer {
  uuidOffer: string;
  offerName: string;
  description: string;
  principalSku?: string | null;
  type: string;
  offerAttributes: OfferAttribute[];
  creationDate: string;
  updateDate: string;
  tags: string[];
  rejectionComment?: string | null;
  termConditions?: string | null;
  details?: OfferDetails;
  variant: Variant[];
  brand: {
    name: string;
  };
  department: {
    name: string;
  };
  business: {
    uuidbusiness: string;
    businessname: string;
    commercialname: string;
    deliveryMethods: {
      deliveryonline: boolean;
      deliveryonhome: boolean;
      deliveryonstore: boolean;
    };
  };
  category: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  status: string;
}

export interface OfferResult {
  campaignCounts?: FieldCount[];
  departmentCounts?: FieldCount[];
  brandCounts?: FieldCount[];
  categoryCounts?: FieldCount[];
  subcategoryCounts?: FieldCount[];
  offers: Offer[];
  totalOffers: number;
}

interface FieldCount {
  uuid?: string;
  name?: string;
  count?: number;
}
