export interface Attribute {
  attributeName: string;
  value: string[];
}

export interface ProductAttribute {
  attributeName: string;
  attribute: Attribute;
}

export interface VariantAttribute {
  attributeName: string;
  value: string;
}

export interface Variant {
  uuidVariant: string;
  attributes: VariantAttribute[];
  currency: string;
  stock: number;
  refPrice: number;
  adflyPrice: number;
  offerPrice?: number;
  maxQuantity?: number;
  imageURL: string;
  sku?: string;
}

export interface VariantDetailed {
  uuidVariant: string;
  attributes: VariantAttribute[];
  currency: string;
  stock: number;
  refPrice: number;
  adflyPrice: number;
  offerPrice?: number;
  maxQuantity?: number;
  imageURL: string;
  sku?: string;
  product: {
    uuidProduct: string;
    productName: string;
    description: string;
    type: string;
  };
}

export interface Product {
  uuidProduct: string;
  productName: string;
  description: string;
  type: string;
  productAttributes: ProductAttribute[];
  variant: Variant[];
  creationDate: string;
  updateDate: string;
  brand: {
    name: string;
  };
  productModel?: string;
  department: {
    name: string;
  };
  category: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  tags: string[];
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
  business: {
    uuidbusiness: string;
    businessname: string;
    deliveryMethods: {
      deliveryonline: boolean;
      deliveryonhome: boolean;
      deliveryonstore: boolean;
    };
  };
}

export interface ProductResult {
  brandCounts?: FieldCount[];
  categoryCounts?: FieldCount[];
  subcategoryCounts?: FieldCount[];
  products: Product[];
  totalProducts: number;
}

interface FieldCount {
  uuid?: string;
  name?: string;
  count?: number;
}
