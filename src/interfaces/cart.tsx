import { VariantAttribute, VariantDetailed } from "./productInterface";

export interface Cart {
  discounts: {
    uuidpromotiondiscount: string;
    uuidinfo: string;
    promotiondiscountvalue: number;
    type: string;
  }[];
  uuidcart: string;
  uuidcollaborator: string;
  creationdate: string;
  updatedate: string;
  status: string;
  expirationdate?: string;
  total: number;
  billingInfo?: {
    uuidbillinginfo: string;
    phone: string;
    ruc?: string;
    businessname?: string;
    fiscaladdress?: string;
  };
  deliveryInfo?: {
    uuiddeliveryinfo: string;
    collaboratoraddress?: {
      uuidcollaboratoraddress: string;
    };
    receivername?: string;
    receiverdocumentkind?: string;
    receiverdocumentnumber?: string;
    receiverphone?: string;
  };
  suborders: CartSubOrder[];
  purchaseNumber: string;
}

export interface CartSubOrder {
  uuidcartsuborder: string;
  uuidcart: string;
  uuidbusiness: string;
  uuidaddress: string;
  businessName: string;
  deliverymethod?: string;
  deliveryprice?: number;
  deliverytime?: string;
  availableDeliveryMethods: {
    online: boolean;
    onhome: boolean;
    onstore: boolean;
    deliveryOnHome: DeliveryHome;
    deliveryOnStore: DeliveryStore[];
  };
  items: CartItem[];
  type: string;
}

export interface CartItem {
  uuidcartitem: string;
  uuidcartsuborder: string;
  uuidvariant: string;
  uuidoffer?: string;
  attributes?: VariantAttribute[];
  variant: VariantDetailed;
  quantity: number;
  subtotal: number;
}

interface DeliveryHome {
  currency: string;
  price: number;
  timetodelivery: string;
  comments?: string;
}

export interface DeliveryStore {
  uuiddeliverystore: string;
  name: string;
  country: string;
  department: string;
  city: string;
  district: string;
  line: string;
  timetodelivery: string;
  comments?: string;
}
