import { VariantDetailed } from "./productInterface";

export interface Cart {
  uuidcart: string;
  uuidcollaborator: string;
  creationdate: string;
  updatedate: string;
  status: string;
  expirationdate?: string;
  total: number;
  suborders: CartSubOrder[];
  purchaseNumber: string;
}

export interface CartSubOrder {
  uuidcartsuborder: string;
  uuidcart: string;
  uuidbusiness: string;
  businessName: string;
  deliverymethod?: string;
  items: CartItem[];
}

export interface CartItem {
  uuidcartitem: string;
  uuidcartsuborder: string;
  uuidvariant: string;
  variant: VariantDetailed;
  quantity: number;
  subtotal: number;
}
