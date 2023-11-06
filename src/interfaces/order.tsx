import {
  DeliveryMethod,
  OrderStatus,
  SuborderStatus,
} from "@modules/common/types";
import { Collaborator } from "./collaborator";
import { Coupon, VariantDetailed } from "./productInterface";

export interface PaginatedOrders {
  orders: Order[];
  totalOrders: number;
}

export interface PaginatedCouponUsages {
  coupons: CouponUsage[];
  totalCoupons: number;
}

export interface CouponUsage {
  uuidcouponcollaboratorusage: string;
  uuidcollaborator: string;
  businessname: string;
  dateused: string;
  type: string;
  couponcode: string;
  uuidproduct: string;
  uuidvariant: string;
  variant?: VariantDetailed;
  couponData?: Coupon;
}
export interface Order {
  uuidOrder: string;
  uuidCollaborator: string;
  creationDate: string;
  status: OrderStatus;
  total: number;
  igv: number;
  finalTotal: number;
  totalIgv: number;
  deliveryPrice: number;
  businessName: string;
  suborders: [Suborder];
  paymentInfo: PaymentInfo;
  comments: string;
  isBilling: boolean;
  isReceiver: boolean;
}

export interface Suborder {
  uuidSuborder: string;
  uuidOrder: string;
  uuidBusiness: string;
  businessName: string;
  sellerName: string;
  creationDate: string;
  status: SuborderStatus;
  total: number;
  deliveryMethod?: DeliveryMethod;
  deliveryPrice?: number;
  deliveryTime?: string;
  deliveryAddress?: {
    alias: string;
    address: string;
    district: string;
    province: string;
    department: string;
    country: string;
    additional?: string;
  };
  items: [SuborderItem];
  comments: string;
}

export interface SuborderItem {
  uuidorderitem: string;
  uuidsuborder: string;
  uuidvariant: string;
  variant: VariantDetailed;
  quantity: number;
  subtotal: number;
}

export interface PaymentInfo {
  canal: string;
  card: string;
  brand: string;
  purchaseNumber: string;
}

export interface OrderReport {
  order: Order;
  billingInfo: BillingInfo;
  deliveryInfo?: DeliveryInfo;
  collaborator: Collaborator;
}

export interface BillingInfo {
  phone: string;
  ruc: string;
  businessname: string;
  fiscaladdress: string;
}

export interface DeliveryInfo {
  receivername: string;
  receiverdocumentkind: string;
  receiverdocumentnumber: string;
  receiverphone: string;
  collaboratoraddress?: {
    address: string;
    lat: number;
    lng: number;
    district: string;
    province: string;
    department: string;
    country: string;
    additional: string;
  };
}
