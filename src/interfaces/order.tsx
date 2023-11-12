import {
  DeliveryMethod,
  OrderStatus,
  SuborderStatus,
} from "@modules/common/types";
import { Collaborator } from "./collaborator";
import { Coupon, VariantAttribute, VariantDetailed } from "./productInterface";

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

export interface OrderDetailsDelivery {
  receivername: string;
  receiverdocumentkind: string;
  receiverdocumentnumber: string;
  phone: string;
}

export interface OrderDetailsBilling {
  phone: string;
  ruc: string;
  businessname: string;
  fiscaladdress: string;
}

export interface OrderDetailsCollaborator {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  phonenumber: string;
}

export interface OrderDetails {
  collaborator: OrderDetailsCollaborator;
  billingInfo: OrderDetailsBilling;
  deliveryInfo: OrderDetailsDelivery;
  isreceiver: boolean;
  isbilling: boolean;
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
  details: OrderDetails;
}

export interface SubOrderDetails {
  name?: string;
  country?: string;
  department?: string;
  province?: string;
  district?: string;
  address?: string;
  comments?: string;
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
  items: [SuborderItem];
  comments: string;
  details: SubOrderDetails;
}

export interface ItemDetails {
  type?: string;
  description?: string;
  refprice?: number;
  adflyprice?: number;
  offerprice?: number;
  imageurl?: string;
  variantsku?: string;
  productname?: string;
  termsconditions?: string;
  principalsku?: string;
  attributes: VariantAttribute[];
  uuidbrand?: string;
  uuiddepartment?: string;
  uuidcategory?: string;
  uuidsubcategory?: string;
  uuidbusiness?: string;
  initialdate?: string;
  expirationdate?: string;
  initialpurchasedate?: string;
  expirationpurchasedate?: string;
  accessservice?: string;
  contentservice?: string;
  servicesCodes?: string[];
  specification?: string;
  condition?: string;
  conditiondetails?: string;
  productwarranty?: string;
  sellerwarranty?: string;
  included?: string;
  width?: number;
  height?: number;
  weight?: number;
  length?: number;
}

export interface SuborderItem {
  uuidorderitem: string;
  uuidsuborder: string;
  uuidvariant: string;
  quantity: number;
  subtotal: number;
  details: ItemDetails;
}

export interface PaymentInfo {
  canal: string;
  card: string;
  brand: string;
  purchaseNumber: string;
}

export interface OrderReport {
  order: Order;
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
