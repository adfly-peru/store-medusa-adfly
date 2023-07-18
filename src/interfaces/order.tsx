import { VariantDetailed } from "./productInterface";

export interface Order {
  uuidorder: string;
  uuidcollaborator: string;
  creationdate: string;
  status: string;
  total: number;
  igv: number;
  finaltotal: number;
  purchasenumber: string;
  installment: number;
  suborders: [Suborder];
}

export interface Suborder {
  uuidsuborder: string;
  uuidorder: string;
  uuidbusiness: string;
  businessName: string;
  creationdate: string;
  status: string;
  total: number;
  deliverymethod?: string;
  items: [SuborderItem];
}

export interface SuborderItem {
  uuidorderitem: string;
  uuidsuborder: string;
  uuidvariant: string;
  variant: VariantDetailed;
  quantity: number;
  subtotal: number;
}
