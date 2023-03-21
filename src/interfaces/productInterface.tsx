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
}
