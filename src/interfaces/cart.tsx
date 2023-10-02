import { VariantDetailed } from "./productInterface";

export interface Cart {
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
    collaboratoraddress: {
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
  businessName: string;
  deliverymethod?: string;
  deliveryprice?: number;
  deliverytime?: string;
  availableDeliveryMethods: {
    online: boolean;
    onhome: boolean;
    onstore: boolean;
    deliveryOnHome: DeliveryHome;
  };
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

interface DeliveryHome {
  currency: string;
  price: number;
  timetodelivery: string;
  comments?: string;
}
