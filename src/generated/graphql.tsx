import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AdflyBanner = {
  __typename?: 'AdflyBanner';
  bannerimageurl?: Maybe<Scalars['String']['output']>;
  bannerlink?: Maybe<Scalars['String']['output']>;
  creationdate: Scalars['DateTime']['output'];
  priority?: Maybe<Scalars['Int']['output']>;
  updatedate: Scalars['DateTime']['output'];
  uuidbanner: Scalars['ID']['output'];
};

export type Attribute = {
  __typename?: 'Attribute';
  attributeName: Scalars['String']['output'];
  values: Array<Scalars['String']['output']>;
};

export type AvailableDeliveryMethods = {
  __typename?: 'AvailableDeliveryMethods';
  deliveryOnHome?: Maybe<DeliveryHome>;
  deliveryOnStore?: Maybe<Array<DeliveryStore>>;
  onhome: Scalars['Boolean']['output'];
  online: Scalars['Boolean']['output'];
  onstore: Scalars['Boolean']['output'];
};

export type BillAndPay = {
  __typename?: 'BillAndPay';
  accountbanknumber?: Maybe<Scalars['String']['output']>;
  accountholder?: Maybe<Scalars['String']['output']>;
  accountinterbanknumber?: Maybe<Scalars['String']['output']>;
  bankname?: Maybe<Scalars['String']['output']>;
  billingfrequency?: Maybe<Scalars['String']['output']>;
  documentnumber?: Maybe<Scalars['String']['output']>;
  documenttype?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  paymentfrequency?: Maybe<Scalars['String']['output']>;
  uuidbillandpay: Scalars['ID']['output'];
  uuidbusiness: Scalars['ID']['output'];
};

export type BillingInfo = {
  __typename?: 'BillingInfo';
  businessname?: Maybe<Scalars['String']['output']>;
  fiscaladdress?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  ruc?: Maybe<Scalars['String']['output']>;
  uuidbillinginfo: Scalars['ID']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  creationDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updateDate: Scalars['DateTime']['output'];
};

export type Business = {
  __typename?: 'Business';
  active: Scalars['Boolean']['output'];
  businessname: Scalars['String']['output'];
  commercialname: Scalars['String']['output'];
  creationdate: Scalars['DateTime']['output'];
  deliveryMethods?: Maybe<DeliveryMethods>;
  fiscaladdress: Scalars['String']['output'];
  ispremium?: Maybe<Scalars['Boolean']['output']>;
  platform: Scalars['String']['output'];
  relationtype: Scalars['String']['output'];
  ruc: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidbusiness: Scalars['ID']['output'];
};

export type BusinessAdmin = {
  __typename?: 'BusinessAdmin';
  active: Scalars['Boolean']['output'];
  creationdate: Scalars['DateTime']['output'];
  credential: Scalars['String']['output'];
  platform: Scalars['String']['output'];
  proffile: Profile;
  relationtype: Scalars['String']['output'];
  rol: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidbusiness: Scalars['ID']['output'];
  uuiduser: Scalars['ID']['output'];
};

export type BusinessStars = {
  __typename?: 'BusinessStars';
  amount: Scalars['Float']['output'];
  collaboratorlastname?: Maybe<Scalars['String']['output']>;
  collaboratorname?: Maybe<Scalars['String']['output']>;
  creationdate: Scalars['DateTime']['output'];
  message?: Maybe<Scalars['String']['output']>;
  operation: Scalars['String']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  responsiblelastname?: Maybe<Scalars['String']['output']>;
  responsiblename?: Maybe<Scalars['String']['output']>;
  uuidstars: Scalars['ID']['output'];
};

export type BusinessSummary = {
  __typename?: 'BusinessSummary';
  popularcategories: Array<PopularData>;
  popularcoupons: Array<PopularData>;
  registeredusers: Scalars['Int']['output'];
  starsAssigned?: Maybe<Scalars['Float']['output']>;
  starsUsed?: Maybe<Scalars['Float']['output']>;
  totalStars: Scalars['Float']['output'];
  totalcoupons: Scalars['Int']['output'];
  totaltransactions: Scalars['Int']['output'];
  totalusers: Scalars['Int']['output'];
  userswithcoupons: Scalars['Int']['output'];
  userswithtransactions: Scalars['Int']['output'];
};

export enum BusinessType {
  Enterprise = 'enterprise',
  Partner = 'partner'
}

export type Campaign = {
  __typename?: 'Campaign';
  creationdate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expirationdate: Scalars['DateTime']['output'];
  initialdate: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  specification?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidcampaign: Scalars['ID']['output'];
};

export type Cart = {
  __typename?: 'Cart';
  billingInfo?: Maybe<BillingInfo>;
  creationdate: Scalars['DateTime']['output'];
  deliveryInfo?: Maybe<DeliveryInfo>;
  discounts?: Maybe<Array<CartPromotionDiscount>>;
  expirationdate?: Maybe<Scalars['DateTime']['output']>;
  purchaseNumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  suborders: Array<CartSubOrder>;
  total: Scalars['Float']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidcart: Scalars['ID']['output'];
  uuidcollaborator: Scalars['ID']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  attributes: Array<VariantAttribute>;
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
  uuidcartitem: Scalars['ID']['output'];
  uuidcartsuborder: Scalars['ID']['output'];
  uuidoffer: Scalars['ID']['output'];
  uuidvariant: Scalars['ID']['output'];
  variant: VariantDetailed;
};

export type CartPromotionDiscount = {
  __typename?: 'CartPromotionDiscount';
  promotiondiscountvalue: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  uuidinfo: Scalars['ID']['output'];
  uuidpromotiondiscount: Scalars['ID']['output'];
};

export type CartSubOrder = {
  __typename?: 'CartSubOrder';
  availableDeliveryMethods?: Maybe<AvailableDeliveryMethods>;
  businessName: Scalars['String']['output'];
  deliverymethod?: Maybe<Scalars['String']['output']>;
  deliveryprice?: Maybe<Scalars['Float']['output']>;
  deliverytime?: Maybe<Scalars['String']['output']>;
  items: Array<CartItem>;
  type?: Maybe<Scalars['String']['output']>;
  uuidaddress?: Maybe<Scalars['ID']['output']>;
  uuidbusiness: Scalars['ID']['output'];
  uuidcart: Scalars['ID']['output'];
  uuidcartsuborder: Scalars['ID']['output'];
  uuidpromotionfreedelivery?: Maybe<Scalars['ID']['output']>;
};

export type Category = {
  __typename?: 'Category';
  active: Scalars['Boolean']['output'];
  creationDate: Scalars['DateTime']['output'];
  department: Department;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subCategories: Array<SubCategory>;
  updateDate: Scalars['DateTime']['output'];
  uuidCategory: Scalars['ID']['output'];
  uuidDepartment: Scalars['ID']['output'];
  visible: Scalars['Boolean']['output'];
};

export type Collaborator = {
  __typename?: 'Collaborator';
  businessname?: Maybe<Scalars['String']['output']>;
  changePassword: Scalars['Boolean']['output'];
  commercialname?: Maybe<Scalars['String']['output']>;
  documentnumber: Scalars['String']['output'];
  documenttype: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  emailVerify: Scalars['Boolean']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletters: Scalars['Boolean']['output'];
  phonenumber?: Maybe<Scalars['String']['output']>;
  preferences?: Maybe<CollaboratorPreferences>;
  stars?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  urlprofile?: Maybe<Scalars['String']['output']>;
  uuidcollaborator: Scalars['ID']['output'];
};

export type CollaboratorAccessRequest = {
  __typename?: 'CollaboratorAccessRequest';
  creationdate: Scalars['DateTime']['output'];
  documentnumber: Scalars['String']['output'];
  documenttype: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedate: Scalars['DateTime']['output'];
  uuidaccessrequest: Scalars['ID']['output'];
  uuidbusiness: Scalars['ID']['output'];
};

export type CollaboratorAddress = {
  __typename?: 'CollaboratorAddress';
  additional?: Maybe<Scalars['String']['output']>;
  address: Scalars['String']['output'];
  alias: Scalars['String']['output'];
  country: Scalars['String']['output'];
  department: Scalars['String']['output'];
  district: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  province: Scalars['String']['output'];
  uuidcollaboratoraddress: Scalars['ID']['output'];
};

export type CollaboratorCouponConnection = {
  __typename?: 'CollaboratorCouponConnection';
  edges: Array<CollaboratorCouponEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CollaboratorCouponEdge = {
  __typename?: 'CollaboratorCouponEdge';
  node: CouponUsage;
};

export type CollaboratorCouponFilterInput = {
  businessname?: InputMaybe<Scalars['String']['input']>;
  dateused?: InputMaybe<DateRangeInput>;
};

export enum CollaboratorCouponSortField {
  Businessname = 'businessname',
  Dateused = 'dateused'
}

export type CollaboratorCouponSortInput = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<CollaboratorCouponSortField>;
};

export type CollaboratorOrderConnection = {
  __typename?: 'CollaboratorOrderConnection';
  edges: Array<CollaboratorOrderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CollaboratorOrderEdge = {
  __typename?: 'CollaboratorOrderEdge';
  node: CollaboratorOrderRow;
};

export type CollaboratorOrderFilterInput = {
  creationdate?: InputMaybe<DateRangeInput>;
  purchasenumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updatedate?: InputMaybe<DateRangeInput>;
};

export type CollaboratorOrderRow = {
  __typename?: 'CollaboratorOrderRow';
  creationdate: Scalars['DateTime']['output'];
  purchasenumber: Scalars['String']['output'];
  status: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidorder: Scalars['ID']['output'];
};

export enum CollaboratorOrderSortField {
  Creationdate = 'creationdate',
  Purchasenumber = 'purchasenumber',
  Total = 'total',
  Updatedate = 'updatedate'
}

export type CollaboratorOrderSortInput = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<CollaboratorOrderSortField>;
};

export type CollaboratorPreferences = {
  __typename?: 'CollaboratorPreferences';
  otherprefercommunication?: Maybe<Scalars['String']['output']>;
  prefercommunication?: Maybe<Array<Scalars['String']['output']>>;
  topproducts?: Maybe<Array<Scalars['String']['output']>>;
  toppromotions?: Maybe<Array<Scalars['String']['output']>>;
  topservices?: Maybe<Array<Scalars['String']['output']>>;
  whatdoyouwant?: Maybe<Array<Scalars['String']['output']>>;
};

export type CollaboratorResume = {
  __typename?: 'CollaboratorResume';
  businessname?: Maybe<Scalars['String']['output']>;
  commercialname?: Maybe<Scalars['String']['output']>;
  documentnumber: Scalars['String']['output'];
  documenttype: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phonenumber?: Maybe<Scalars['String']['output']>;
  uuidcollaborator: Scalars['ID']['output'];
};

export type CollaboratorStars = {
  __typename?: 'CollaboratorStars';
  amount: Scalars['Float']['output'];
  creationdate: Scalars['DateTime']['output'];
  message?: Maybe<Scalars['String']['output']>;
  operation: Scalars['String']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  responsiblelastname?: Maybe<Scalars['String']['output']>;
  responsiblename?: Maybe<Scalars['String']['output']>;
  uuidorder?: Maybe<Scalars['ID']['output']>;
  uuidstars: Scalars['ID']['output'];
};

export type CollaboratorStarsConnection = {
  __typename?: 'CollaboratorStarsConnection';
  edges: Array<CollaboratorStarsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CollaboratorStarsEdge = {
  __typename?: 'CollaboratorStarsEdge';
  node: CollaboratorStars;
};

export type CollaboratorStarsFilterInput = {
  creationdate?: InputMaybe<DateRangeInput>;
  message?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export enum CollaboratorStarsSortField {
  Amount = 'amount',
  Creationdate = 'creationdate',
  Message = 'message',
  Reason = 'reason'
}

export type CollaboratorStarsSortInput = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<CollaboratorStarsSortField>;
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  email?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  uuidbusiness: Scalars['ID']['output'];
  uuidcontactinfo: Scalars['ID']['output'];
};

export type Coupon = {
  __typename?: 'Coupon';
  couponCode?: Maybe<Scalars['String']['output']>;
  couponContent: Scalars['String']['output'];
  couponUsage: Scalars['String']['output'];
  discount: Scalars['Float']['output'];
  discountType: Scalars['String']['output'];
  expirationDate: Scalars['DateTime']['output'];
  expirationPurchaseDate: Scalars['DateTime']['output'];
  initialDate: Scalars['DateTime']['output'];
  initialPurchaseDate: Scalars['DateTime']['output'];
};

export type CouponUsage = {
  __typename?: 'CouponUsage';
  businessname?: Maybe<Scalars['String']['output']>;
  collaborator?: Maybe<Collaborator>;
  couponData?: Maybe<Coupon>;
  couponcode?: Maybe<Scalars['String']['output']>;
  dateused?: Maybe<Scalars['DateTime']['output']>;
  offer?: Maybe<Offer>;
  type?: Maybe<Scalars['String']['output']>;
  uuidcollaborator: Scalars['ID']['output'];
  uuidcouponcollaboratorusage: Scalars['ID']['output'];
  uuidproduct: Scalars['ID']['output'];
  uuidvariant: Scalars['ID']['output'];
  variant?: Maybe<VariantDetailed>;
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DeliveryHome = {
  __typename?: 'DeliveryHome';
  city?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  timetodelivery?: Maybe<Scalars['String']['output']>;
  uuidbusiness: Scalars['ID']['output'];
  uuiddeliveryhome: Scalars['ID']['output'];
};

export type DeliveryInfo = {
  __typename?: 'DeliveryInfo';
  collaboratoraddress?: Maybe<CollaboratorAddress>;
  receiverdocumentkind?: Maybe<Scalars['String']['output']>;
  receiverdocumentnumber?: Maybe<Scalars['String']['output']>;
  receivername?: Maybe<Scalars['String']['output']>;
  receiverphone?: Maybe<Scalars['String']['output']>;
  uuiddeliveryinfo: Scalars['ID']['output'];
};

export type DeliveryMethods = {
  __typename?: 'DeliveryMethods';
  deliveryonhome: Scalars['Boolean']['output'];
  deliveryonline: Scalars['Boolean']['output'];
  deliveryonstore: Scalars['Boolean']['output'];
  uuidbusiness?: Maybe<Scalars['ID']['output']>;
  uuiddeliverymethod?: Maybe<Scalars['ID']['output']>;
};

export type DeliveryStore = {
  __typename?: 'DeliveryStore';
  city?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  line?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  timetodelivery?: Maybe<Scalars['String']['output']>;
  uuidbusiness: Scalars['ID']['output'];
  uuiddeliverystore: Scalars['ID']['output'];
};

export type Department = {
  __typename?: 'Department';
  active: Scalars['Boolean']['output'];
  categories: Array<Category>;
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  outstanding: Scalars['Boolean']['output'];
  section: Scalars['String']['output'];
  updateDate: Scalars['DateTime']['output'];
  visible: Scalars['Boolean']['output'];
};

export type DesignConfig = {
  __typename?: 'DesignConfig';
  backcolor: Scalars['String']['output'];
  bannerurl: Scalars['String']['output'];
  commercialname?: Maybe<Scalars['String']['output']>;
  fontcolor: Scalars['String']['output'];
  href?: Maybe<Scalars['String']['output']>;
  ispremium?: Maybe<Scalars['Boolean']['output']>;
  logourl: Scalars['String']['output'];
  uuidbannerurl?: Maybe<Scalars['ID']['output']>;
  uuidlogourl?: Maybe<Scalars['ID']['output']>;
};

export type District = {
  __typename?: 'District';
  active: Scalars['Boolean']['output'];
  creationdate: Scalars['DateTime']['output'];
  districtname: Scalars['String']['output'];
  region: Region;
  updatedate: Scalars['DateTime']['output'];
  uuiddistrict: Scalars['ID']['output'];
};

export type FieldCount = {
  __typename?: 'FieldCount';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type HomeList = {
  __typename?: 'HomeList';
  active: Scalars['Boolean']['output'];
  creationdate: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  pos: Scalars['Int']['output'];
  products: Array<Scalars['String']['output']>;
  productsList?: Maybe<Array<Offer>>;
  section: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidhomelist: Scalars['ID']['output'];
};

export type ItemDetails = {
  __typename?: 'ItemDetails';
  accessservice?: Maybe<Scalars['String']['output']>;
  adflyprice?: Maybe<Scalars['Float']['output']>;
  attributes: Array<VariantAttribute>;
  condition?: Maybe<Scalars['String']['output']>;
  conditiondetails?: Maybe<Scalars['String']['output']>;
  contentservice?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expirationdate?: Maybe<Scalars['String']['output']>;
  expirationpurchasedate?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  imageurl?: Maybe<Scalars['String']['output']>;
  included?: Maybe<Scalars['String']['output']>;
  initialdate?: Maybe<Scalars['String']['output']>;
  initialpurchasedate?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  offerprice?: Maybe<Scalars['Float']['output']>;
  principalsku?: Maybe<Scalars['String']['output']>;
  productname?: Maybe<Scalars['String']['output']>;
  productwarranty?: Maybe<Scalars['String']['output']>;
  refprice?: Maybe<Scalars['Float']['output']>;
  sellerwarranty?: Maybe<Scalars['String']['output']>;
  servicesCodes?: Maybe<Array<Scalars['String']['output']>>;
  specification?: Maybe<Scalars['String']['output']>;
  termsconditions?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  uuidbrand?: Maybe<Scalars['String']['output']>;
  uuidbusiness?: Maybe<Scalars['String']['output']>;
  uuidcategory?: Maybe<Scalars['String']['output']>;
  uuiddepartment?: Maybe<Scalars['String']['output']>;
  uuidsubcategory?: Maybe<Scalars['String']['output']>;
  variantsku?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type MarketDesign = {
  __typename?: 'MarketDesign';
  home_page: DesignConfig;
  login: DesignConfig;
  marketname: Scalars['String']['output'];
  marketurl: Scalars['String']['output'];
};

export type MarketWorkplace = {
  __typename?: 'MarketWorkplace';
  address: Scalars['String']['output'];
  country: Scalars['String']['output'];
  creationdate: Scalars['DateTime']['output'];
  department: Scalars['String']['output'];
  district: Scalars['String']['output'];
  name: Scalars['String']['output'];
  province: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidbusiness: Scalars['ID']['output'];
  uuidworkplace: Scalars['ID']['output'];
};

export type Offer = {
  __typename?: 'Offer';
  brand: Brand;
  business: Business;
  category: Category;
  creationDate: Scalars['DateTime']['output'];
  department: Department;
  description: Scalars['String']['output'];
  details?: Maybe<OfferDetails>;
  offerAttributes: Array<OfferAttribute>;
  offerModel?: Maybe<Scalars['String']['output']>;
  offerName: Scalars['String']['output'];
  principalSku?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
  rejectionComment?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subCategory: SubCategory;
  tags: Array<Scalars['String']['output']>;
  termConditions?: Maybe<Scalars['String']['output']>;
  type: OfferType;
  updateDate: Scalars['DateTime']['output'];
  uuidOffer: Scalars['ID']['output'];
  variant: Array<Variant>;
};

export type OfferAttribute = {
  __typename?: 'OfferAttribute';
  attribute: Attribute;
  attributeName: Scalars['String']['output'];
};

export type OfferCampaign = {
  __typename?: 'OfferCampaign';
  creationdate: Scalars['DateTime']['output'];
  offer: Offer;
  status: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidoffercampaign: Scalars['ID']['output'];
};

export type OfferDetails = {
  __typename?: 'OfferDetails';
  adflyPrice: Scalars['Float']['output'];
  discount?: Maybe<Scalars['Float']['output']>;
  discountType?: Maybe<Scalars['String']['output']>;
  imageURL: Scalars['String']['output'];
  offerPrice?: Maybe<Scalars['Float']['output']>;
  refPrice: Scalars['Float']['output'];
  totalStock?: Maybe<Scalars['Int']['output']>;
};

export type OfferForCollaborator = {
  __typename?: 'OfferForCollaborator';
  lastcoupon?: Maybe<Scalars['String']['output']>;
  offer: Offer;
  totalLastPeriod?: Maybe<Scalars['Int']['output']>;
};

export type OfferResume = {
  __typename?: 'OfferResume';
  description: Scalars['String']['output'];
  offerName: Scalars['String']['output'];
  termConditions?: Maybe<Scalars['String']['output']>;
  type: OfferType;
  uuidOffer: Scalars['ID']['output'];
  uuidcampaign?: Maybe<Scalars['ID']['output']>;
  uuiddepartment?: Maybe<Scalars['ID']['output']>;
};

export enum OfferType {
  Coupon = 'coupon',
  Product = 'product',
  Service = 'service'
}

export type Order = {
  __typename?: 'Order';
  businessName: Scalars['String']['output'];
  collaborator?: Maybe<Collaborator>;
  comments?: Maybe<Scalars['String']['output']>;
  creationDate: Scalars['DateTime']['output'];
  deliveryPrice: Scalars['Float']['output'];
  details?: Maybe<OrderDetails>;
  finalTotal: Scalars['Float']['output'];
  igv: Scalars['Float']['output'];
  paymentInfo?: Maybe<PaymentInfo>;
  starsUsed?: Maybe<Scalars['Int']['output']>;
  starspurchasenumber?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  suborders: Array<Suborder>;
  total: Scalars['Float']['output'];
  totalIgv: Scalars['Float']['output'];
  updateDate: Scalars['DateTime']['output'];
  uuidCollaborator: Scalars['ID']['output'];
  uuidOrder: Scalars['ID']['output'];
  uuidTransaction: Scalars['String']['output'];
};

export type OrderDetails = {
  __typename?: 'OrderDetails';
  billingInfo?: Maybe<OrderDetailsBilling>;
  cartdiscount?: Maybe<Scalars['Float']['output']>;
  collaborator?: Maybe<OrderDetailsCollaborator>;
  deliveryInfo?: Maybe<OrderDetailsDelivery>;
  isbilling?: Maybe<Scalars['Boolean']['output']>;
  isreceiver?: Maybe<Scalars['Boolean']['output']>;
  partnersdiscount?: Maybe<Scalars['Float']['output']>;
};

export type OrderDetailsBilling = {
  __typename?: 'OrderDetailsBilling';
  businessname?: Maybe<Scalars['String']['output']>;
  fiscaladdress?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  ruc?: Maybe<Scalars['String']['output']>;
};

export type OrderDetailsCollaborator = {
  __typename?: 'OrderDetailsCollaborator';
  documentnumber?: Maybe<Scalars['String']['output']>;
  documenttype?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phonenumber?: Maybe<Scalars['String']['output']>;
};

export type OrderDetailsDelivery = {
  __typename?: 'OrderDetailsDelivery';
  phone?: Maybe<Scalars['String']['output']>;
  receiverdocumentkind?: Maybe<Scalars['String']['output']>;
  receiverdocumentnumber?: Maybe<Scalars['String']['output']>;
  receivername?: Maybe<Scalars['String']['output']>;
};

export type OrderReport = {
  __typename?: 'OrderReport';
  collaborator: Collaborator;
  order: Order;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedAdflyBanners = {
  __typename?: 'PaginatedAdflyBanners';
  banners: Array<AdflyBanner>;
  total: Scalars['Int']['output'];
};

export type PaginatedBrands = {
  __typename?: 'PaginatedBrands';
  brands: Array<Brand>;
  total: Scalars['Int']['output'];
};

export type PaginatedBusinessAdmins = {
  __typename?: 'PaginatedBusinessAdmins';
  businessAdmins: Array<BusinessAdmin>;
  total: Scalars['Int']['output'];
};

export type PaginatedBusinessStars = {
  __typename?: 'PaginatedBusinessStars';
  operations: Array<BusinessStars>;
  starsAssigned?: Maybe<Scalars['Float']['output']>;
  starsUsed?: Maybe<Scalars['Float']['output']>;
  totalOperations: Scalars['Int']['output'];
  totalStars: Scalars['Float']['output'];
};

export type PaginatedBusinesses = {
  __typename?: 'PaginatedBusinesses';
  businesses: Array<Business>;
  total: Scalars['Int']['output'];
};

export type PaginatedCampaigns = {
  __typename?: 'PaginatedCampaigns';
  campaigns: Array<Campaign>;
  total: Scalars['Int']['output'];
};

export type PaginatedCategories = {
  __typename?: 'PaginatedCategories';
  categories: Array<Category>;
  total: Scalars['Int']['output'];
};

export type PaginatedCollaboratorAccessRequest = {
  __typename?: 'PaginatedCollaboratorAccessRequest';
  requests: Array<CollaboratorAccessRequest>;
  total: Scalars['Int']['output'];
};

export type PaginatedCollaboratorStars = {
  __typename?: 'PaginatedCollaboratorStars';
  operations: Array<CollaboratorStars>;
  totalOperations: Scalars['Int']['output'];
  totalStars: Scalars['Float']['output'];
};

export type PaginatedCollaborators = {
  __typename?: 'PaginatedCollaborators';
  collaborators: Array<Collaborator>;
  total: Scalars['Int']['output'];
};

export type PaginatedCouponUsages = {
  __typename?: 'PaginatedCouponUsages';
  coupons: Array<CouponUsage>;
  totalCoupons: Scalars['Int']['output'];
};

export type PaginatedDeliveryHome = {
  __typename?: 'PaginatedDeliveryHome';
  deliveryhomes: Array<DeliveryHome>;
  total: Scalars['Int']['output'];
};

export type PaginatedDeliveryStore = {
  __typename?: 'PaginatedDeliveryStore';
  deliverystores: Array<DeliveryStore>;
  total: Scalars['Int']['output'];
};

export type PaginatedDepartments = {
  __typename?: 'PaginatedDepartments';
  departments: Array<Department>;
  total: Scalars['Int']['output'];
};

export type PaginatedHomeLists = {
  __typename?: 'PaginatedHomeLists';
  homeLists: Array<HomeList>;
  total: Scalars['Int']['output'];
};

export type PaginatedMarketWorkplaces = {
  __typename?: 'PaginatedMarketWorkplaces';
  marketWorkplaces: Array<MarketWorkplace>;
  total: Scalars['Int']['output'];
};

export type PaginatedOfferCampaigns = {
  __typename?: 'PaginatedOfferCampaigns';
  offers: Array<OfferCampaign>;
  total: Scalars['Int']['output'];
};

export type PaginatedOffers = {
  __typename?: 'PaginatedOffers';
  brandCounts?: Maybe<Array<Maybe<FieldCount>>>;
  campaignCounts?: Maybe<Array<Maybe<FieldCount>>>;
  categoryCounts?: Maybe<Array<Maybe<FieldCount>>>;
  departmentCounts?: Maybe<Array<Maybe<FieldCount>>>;
  offers: Array<Offer>;
  subcategoryCounts?: Maybe<Array<Maybe<FieldCount>>>;
  totalOffers: Scalars['Int']['output'];
};

export type PaginatedOrders = {
  __typename?: 'PaginatedOrders';
  orders: Array<Order>;
  totalOrders: Scalars['Int']['output'];
};

export type PaginatedPromotions = {
  __typename?: 'PaginatedPromotions';
  promotions: Array<Promotion>;
  total: Scalars['Int']['output'];
};

export type PaginatedSubOrders = {
  __typename?: 'PaginatedSubOrders';
  suborders: Array<Suborder>;
  totalSuborders: Scalars['Int']['output'];
};

export type PaginatedSubcategories = {
  __typename?: 'PaginatedSubcategories';
  subcategories: Array<SubCategory>;
  total: Scalars['Int']['output'];
};

export type PaymentInfo = {
  __typename?: 'PaymentInfo';
  brand?: Maybe<Scalars['String']['output']>;
  canal?: Maybe<Scalars['String']['output']>;
  card?: Maybe<Scalars['String']['output']>;
  purchaseNumber?: Maybe<Scalars['String']['output']>;
};

export type PopularData = {
  __typename?: 'PopularData';
  data: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  condition: Scalars['String']['output'];
  conditionDetails?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  included?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Float']['output']>;
  productWarranty?: Maybe<Scalars['String']['output']>;
  sellerWarranty?: Maybe<Scalars['String']['output']>;
  specification?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type Profile = {
  __typename?: 'Profile';
  creationdate: Scalars['DateTime']['output'];
  firstname: Scalars['String']['output'];
  identificationnumber: Scalars['String']['output'];
  identificationtype: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidprofile: Scalars['ID']['output'];
  uuiduser: Scalars['ID']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  adflypromotion?: Maybe<Scalars['Boolean']['output']>;
  discountlimitbytype?: Maybe<Scalars['String']['output']>;
  discounttype?: Maybe<Scalars['String']['output']>;
  discountvalue?: Maybe<Scalars['Float']['output']>;
  duedate: Scalars['DateTime']['output'];
  initialdate: Scalars['DateTime']['output'];
  maxusageperuser?: Maybe<Scalars['Int']['output']>;
  maxusagetotal?: Maybe<Scalars['Int']['output']>;
  offersegmentationtype?: Maybe<Scalars['String']['output']>;
  offersegmentationvalue?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  promotionname: Scalars['String']['output'];
  promotiontype: Scalars['String']['output'];
  purchasecondition?: Maybe<Scalars['String']['output']>;
  purchaseconditionlimit?: Maybe<Scalars['String']['output']>;
  purchaseconditionvalue?: Maybe<Scalars['String']['output']>;
  purchaselimitvalue?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  segmentationclienttype?: Maybe<Scalars['String']['output']>;
  segmentationclientvalue?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  segmentationpartnertype?: Maybe<Scalars['String']['output']>;
  segmentationpartnervalue?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  segmentdiscounttype?: Maybe<Scalars['String']['output']>;
  segmentdiscountvalue?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  state: Scalars['String']['output'];
  termsandconditions?: Maybe<Scalars['String']['output']>;
  uuidpromotion: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  activeBannersLists: Array<SecondaryBannersList>;
  activeHomeLists: Array<HomeList>;
  availableOffers: PaginatedOffers;
  availablePromotions: Array<Promotion>;
  banners: Array<AdflyBanner>;
  bannersList: Array<SecondaryBannersList>;
  billingDataByBusiness?: Maybe<BillAndPay>;
  billingInfoByOrderID?: Maybe<BillingInfo>;
  brands: Array<Brand>;
  businessAdminById: BusinessAdmin;
  businessAdminsByBusiness: Array<BusinessAdmin>;
  businessById: Business;
  businessOffersByCampaign: PaginatedOfferCampaigns;
  businessStars: PaginatedBusinessStars;
  businesses: Array<Business>;
  campaigns: Array<Campaign>;
  cart?: Maybe<Cart>;
  categories: Array<Category>;
  categoriesByDepartment: Array<Category>;
  category?: Maybe<Category>;
  collaborator: Collaborator;
  collaboratorAccessRequestByBusiness: PaginatedCollaboratorAccessRequest;
  collaboratorCouponUsage?: Maybe<CouponUsage>;
  collaboratorCoupons: CollaboratorCouponConnection;
  collaboratorOrder?: Maybe<OrderReport>;
  collaboratorOrders: CollaboratorOrderConnection;
  collaboratorStars: CollaboratorStarsConnection;
  collaboratoraddresses: Array<CollaboratorAddress>;
  collaborators: PaginatedCollaborators;
  contactInfoByBusiness?: Maybe<ContactInfo>;
  couponReport?: Maybe<CouponUsage>;
  deliveryHomeByBusiness: PaginatedDeliveryHome;
  deliveryMethodsByBusiness: DeliveryMethods;
  deliveryStoreByBusiness: PaginatedDeliveryStore;
  department?: Maybe<Department>;
  departments: Array<Department>;
  districts: Array<District>;
  getAllCoupons: PaginatedCouponUsages;
  getAllHomeLists: PaginatedHomeLists;
  getBusinessSummary?: Maybe<BusinessSummary>;
  getCampaign: Campaign;
  getCouponsByBusiness: PaginatedCouponUsages;
  getOfferCampaign: OfferCampaign;
  getOrder?: Maybe<Order>;
  getOrderReport?: Maybe<OrderReport>;
  getSuborder?: Maybe<Suborder>;
  getSuborderReport?: Maybe<SuborderReport>;
  homeDesign: DesignConfig;
  homeLists: Array<HomeList>;
  loginDesign: DesignConfig;
  marketDesign: MarketDesign;
  offer?: Maybe<Offer>;
  offerForCollaborator?: Maybe<OfferForCollaborator>;
  offers: PaginatedOffers;
  offersByBusiness: PaginatedOffers;
  offersByBusinessAdmin: PaginatedOffers;
  offersByCampaign: PaginatedOfferCampaigns;
  offersByCategory: Array<Offer>;
  offersByDepartment: Array<Offer>;
  offersBySubCategory: Array<Offer>;
  orders: PaginatedOrders;
  paginatedBrands: PaginatedBrands;
  paginatedBusinessAdmins: PaginatedBusinessAdmins;
  paginatedBusinesses: PaginatedBusinesses;
  paginatedCategories: PaginatedCategories;
  paginatedDepartments: PaginatedDepartments;
  paginatedMarketWorkplaces: PaginatedMarketWorkplaces;
  paginatedSubcategories: PaginatedSubcategories;
  promotions: PaginatedPromotions;
  receiverInfoByOrderID?: Maybe<DeliveryInfo>;
  regions: Array<Region>;
  simpleCart?: Maybe<ResumeCart>;
  storeDesign: DesignConfig;
  subcategories: Array<SubCategory>;
  subcategory?: Maybe<SubCategory>;
  suborders: PaginatedSubOrders;
  subordersByEnterpriseID: PaginatedSubOrders;
  subordersByPartnerID: PaginatedSubOrders;
  variants: Array<Variant>;
};


export type QueryAvailableOffersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  brandName?: InputMaybe<Scalars['String']['input']>;
  campaign?: InputMaybe<Scalars['String']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  deliveryMethod?: InputMaybe<Scalars['String']['input']>;
  departmentName?: InputMaybe<Scalars['String']['input']>;
  excludedId?: InputMaybe<Scalars['ID']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  offerSearch?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  subcategoryName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBillingDataByBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


export type QueryBillingInfoByOrderIdArgs = {
  orderID: Scalars['ID']['input'];
};


export type QueryBusinessAdminByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBusinessAdminsByBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


export type QueryBusinessByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBusinessOffersByCampaignArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  uuidbusiness: Scalars['ID']['input'];
  uuidcampaign: Scalars['ID']['input'];
};


export type QueryBusinessStarsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCategoriesByDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCollaboratorAccessRequestByBusinessArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollaboratorCouponUsageArgs = {
  uuidcouponcollaboratorusage: Scalars['ID']['input'];
};


export type QueryCollaboratorCouponsArgs = {
  filter?: InputMaybe<CollaboratorCouponFilterInput>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  sort?: InputMaybe<CollaboratorCouponSortInput>;
};


export type QueryCollaboratorOrderArgs = {
  uuidorder: Scalars['ID']['input'];
};


export type QueryCollaboratorOrdersArgs = {
  filter?: InputMaybe<CollaboratorOrderFilterInput>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  sort?: InputMaybe<CollaboratorOrderSortInput>;
};


export type QueryCollaboratorStarsArgs = {
  filter?: InputMaybe<CollaboratorStarsFilterInput>;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  sort?: InputMaybe<CollaboratorStarsSortInput>;
};


export type QueryCollaboratorsArgs = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  uuidbusiness: Scalars['ID']['input'];
};


export type QueryContactInfoByBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


export type QueryCouponReportArgs = {
  uuidcouponcollaboratorusage: Scalars['ID']['input'];
};


export type QueryDeliveryHomeByBusinessArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDeliveryMethodsByBusinessArgs = {
  businessId: Scalars['ID']['input'];
};


export type QueryDeliveryStoreByBusinessArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  department?: InputMaybe<Scalars['String']['input']>;
  district?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDepartmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetAllCouponsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllHomeListsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetBusinessSummaryArgs = {
  enddate: Scalars['DateTime']['input'];
  idbusiness: Scalars['ID']['input'];
  startdate: Scalars['DateTime']['input'];
};


export type QueryGetCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetCouponsByBusinessArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  uuidbusiness: Scalars['ID']['input'];
};


export type QueryGetOfferCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrderArgs = {
  uuidorder: Scalars['ID']['input'];
};


export type QueryGetOrderReportArgs = {
  uuidorder: Scalars['ID']['input'];
};


export type QueryGetSuborderArgs = {
  uuidSuborder: Scalars['ID']['input'];
};


export type QueryGetSuborderReportArgs = {
  uuidSuborder: Scalars['ID']['input'];
};


export type QueryHomeDesignArgs = {
  uuidcollaborator: Scalars['ID']['input'];
};


export type QueryLoginDesignArgs = {
  subdomain: Scalars['String']['input'];
};


export type QueryMarketDesignArgs = {
  uuidbusiness: Scalars['ID']['input'];
};


export type QueryOfferArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOfferForCollaboratorArgs = {
  uuidproduct: Scalars['ID']['input'];
};


export type QueryOffersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  withCount?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOffersByBusinessArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  uuidBusiness: Scalars['ID']['input'];
};


export type QueryOffersByBusinessAdminArgs = {
  brandName?: InputMaybe<Scalars['String']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  departmentName?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offerSearch?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  subcategoryName?: InputMaybe<Scalars['String']['input']>;
  uuidUser: Scalars['ID']['input'];
};


export type QueryOffersByCampaignArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onlyAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  uuidcampaign: Scalars['ID']['input'];
};


export type QueryOffersByCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type QueryOffersByDepartmentArgs = {
  departmentId: Scalars['ID']['input'];
};


export type QueryOffersBySubCategoryArgs = {
  subcategoryId: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedBrandsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedBusinessAdminsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedBusinessesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BusinessType>;
};


export type QueryPaginatedCategoriesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedDepartmentsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedMarketWorkplacesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaginatedSubcategoriesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPromotionsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReceiverInfoByOrderIdArgs = {
  orderID: Scalars['ID']['input'];
};


export type QueryStoreDesignArgs = {
  subdomain: Scalars['String']['input'];
};


export type QuerySubcategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubordersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubordersByEnterpriseIdArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessID: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubordersByPartnerIdArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  businessID: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchBy?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVariantsArgs = {
  offerId: Scalars['ID']['input'];
};

export type Region = {
  __typename?: 'Region';
  active: Scalars['Boolean']['output'];
  creationdate: Scalars['DateTime']['output'];
  regionname: Scalars['String']['output'];
  updatedate: Scalars['DateTime']['output'];
  uuidregion: Scalars['ID']['output'];
};

export type ResumeCart = {
  __typename?: 'ResumeCart';
  purchaseNumber: Scalars['String']['output'];
  suborders: Array<ResumeCartSubOrder>;
  total: Scalars['Float']['output'];
  uuidcart: Scalars['ID']['output'];
};

export type ResumeCartItem = {
  __typename?: 'ResumeCartItem';
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
  uuidcartitem: Scalars['ID']['output'];
  variant: VariantDetailed;
};

export type ResumeCartSubOrder = {
  __typename?: 'ResumeCartSubOrder';
  deliverymethod?: Maybe<Scalars['String']['output']>;
  deliveryprice?: Maybe<Scalars['Float']['output']>;
  deliverytime?: Maybe<Scalars['String']['output']>;
  items: Array<ResumeCartItem>;
  type?: Maybe<Scalars['String']['output']>;
  uuidaddress?: Maybe<Scalars['ID']['output']>;
  uuidbusiness: Scalars['ID']['output'];
  uuidcartsuborder: Scalars['ID']['output'];
};

export type SecondaryBanner = {
  __typename?: 'SecondaryBanner';
  imgurl: Scalars['String']['output'];
  linkurl: Scalars['String']['output'];
  uuidbannerlistdetail: Scalars['ID']['output'];
};

export type SecondaryBannersList = {
  __typename?: 'SecondaryBannersList';
  active: Scalars['Boolean']['output'];
  banners: Array<SecondaryBanner>;
  name: Scalars['String']['output'];
  pos: Scalars['Int']['output'];
  uuidbannerlist: Scalars['ID']['output'];
};

export type Service = {
  __typename?: 'Service';
  accessService: Scalars['String']['output'];
  contentService: Scalars['String']['output'];
  couponCode?: Maybe<Scalars['String']['output']>;
  expirationDate: Scalars['DateTime']['output'];
  expirationPurchaseDate: Scalars['DateTime']['output'];
  initialDate: Scalars['DateTime']['output'];
  initialPurchaseDate: Scalars['DateTime']['output'];
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SubCategory = {
  __typename?: 'SubCategory';
  active: Scalars['Boolean']['output'];
  category: Category;
  creationDate: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updateDate: Scalars['DateTime']['output'];
  uuidCategory: Scalars['ID']['output'];
  uuidSubCategory: Scalars['ID']['output'];
  visible: Scalars['Boolean']['output'];
};

export type SubOrderDetails = {
  __typename?: 'SubOrderDetails';
  address?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  district?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
};

export type Suborder = {
  __typename?: 'Suborder';
  businessName: Scalars['String']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  creationDate: Scalars['DateTime']['output'];
  deliveryMethod?: Maybe<Scalars['String']['output']>;
  deliveryPrice?: Maybe<Scalars['Float']['output']>;
  deliveryTime?: Maybe<Scalars['String']['output']>;
  details?: Maybe<SubOrderDetails>;
  items: Array<SuborderItem>;
  order?: Maybe<Order>;
  purchaseNumber: Scalars['String']['output'];
  sellerName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  updateDate: Scalars['DateTime']['output'];
  uuidBusiness: Scalars['ID']['output'];
  uuidOrder: Scalars['ID']['output'];
  uuidSuborder: Scalars['ID']['output'];
};

export type SuborderItem = {
  __typename?: 'SuborderItem';
  details?: Maybe<ItemDetails>;
  quantity: Scalars['Int']['output'];
  subtotal: Scalars['Float']['output'];
  uuidorderitem: Scalars['ID']['output'];
  uuidsuborder: Scalars['ID']['output'];
  uuidvariant: Scalars['ID']['output'];
};

export type SuborderReport = {
  __typename?: 'SuborderReport';
  collaborator: Collaborator;
  suborder: Suborder;
};

export type Variant = {
  __typename?: 'Variant';
  additionalimages: Array<Scalars['String']['output']>;
  adflyPrice: Scalars['Float']['output'];
  attributes: Array<VariantAttribute>;
  coupon?: Maybe<Coupon>;
  currency: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  offerPrice?: Maybe<Scalars['Float']['output']>;
  product?: Maybe<Product>;
  purchasePeriod?: Maybe<Scalars['String']['output']>;
  refPrice: Scalars['Float']['output'];
  service?: Maybe<Service>;
  stock: Scalars['Int']['output'];
  uuidVariant: Scalars['ID']['output'];
  variantSku?: Maybe<Scalars['String']['output']>;
};

export type VariantAttribute = {
  __typename?: 'VariantAttribute';
  attributeName: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type VariantDetailed = {
  __typename?: 'VariantDetailed';
  adflyPrice: Scalars['Float']['output'];
  attributes: Array<VariantAttribute>;
  currency: Scalars['String']['output'];
  imageURL: Scalars['String']['output'];
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  offer: OfferResume;
  offerPrice?: Maybe<Scalars['Float']['output']>;
  purchasePeriod?: Maybe<Scalars['String']['output']>;
  refPrice: Scalars['Float']['output'];
  service?: Maybe<Service>;
  stock: Scalars['Int']['output'];
  totalLastPeriod?: Maybe<Scalars['Int']['output']>;
  totalStock: Scalars['Int']['output'];
  uuidVariant: Scalars['ID']['output'];
  variantSku?: Maybe<Scalars['String']['output']>;
};

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename?: 'Query', cart?: { __typename?: 'Cart', uuidcart: string, uuidcollaborator: string, creationdate: any, updatedate: any, status: string, expirationdate?: any | null, total: number, purchaseNumber: string, billingInfo?: { __typename?: 'BillingInfo', uuidbillinginfo: string, phone?: string | null, ruc?: string | null, businessname?: string | null, fiscaladdress?: string | null } | null, deliveryInfo?: { __typename?: 'DeliveryInfo', uuiddeliveryinfo: string, receivername?: string | null, receiverphone?: string | null, receiverdocumentkind?: string | null, receiverdocumentnumber?: string | null, collaboratoraddress?: { __typename?: 'CollaboratorAddress', uuidcollaboratoraddress: string } | null } | null, suborders: Array<{ __typename?: 'CartSubOrder', uuidcartsuborder: string, uuidcart: string, uuidbusiness: string, uuidaddress?: string | null, businessName: string, deliverymethod?: string | null, deliveryprice?: number | null, deliverytime?: string | null, type?: string | null, availableDeliveryMethods?: { __typename?: 'AvailableDeliveryMethods', online: boolean, onhome: boolean, onstore: boolean, deliveryOnHome?: { __typename?: 'DeliveryHome', currency?: string | null, price?: number | null, timetodelivery?: string | null, comments?: string | null } | null, deliveryOnStore?: Array<{ __typename?: 'DeliveryStore', uuiddeliverystore: string, name?: string | null, country?: string | null, department?: string | null, city?: string | null, district?: string | null, line?: string | null, timetodelivery?: string | null, comments?: string | null }> | null } | null, items: Array<{ __typename?: 'CartItem', uuidcartitem: string, uuidcartsuborder: string, uuidvariant: string, uuidoffer: string, quantity: number, subtotal: number, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, variant: { __typename?: 'VariantDetailed', uuidVariant: string, currency: string, stock: number, totalStock: number, refPrice: number, adflyPrice: number, offerPrice?: number | null, maxQuantity?: number | null, purchasePeriod?: string | null, imageURL: string, variantSku?: string | null, totalLastPeriod?: number | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, offer: { __typename?: 'OfferResume', uuidOffer: string, offerName: string, description: string, type: OfferType, termConditions?: string | null, uuiddepartment?: string | null, uuidcampaign?: string | null } } }> }> } | null };

export type SimpleCartQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleCartQuery = { __typename?: 'Query', simpleCart?: { __typename?: 'ResumeCart', uuidcart: string, total: number, purchaseNumber: string, suborders: Array<{ __typename?: 'ResumeCartSubOrder', uuidcartsuborder: string, uuidbusiness: string, uuidaddress?: string | null, deliverymethod?: string | null, deliveryprice?: number | null, deliverytime?: string | null, type?: string | null, items: Array<{ __typename?: 'ResumeCartItem', uuidcartitem: string, quantity: number, subtotal: number, variant: { __typename?: 'VariantDetailed', uuidVariant: string, currency: string, stock: number, totalStock: number, refPrice: number, adflyPrice: number, offerPrice?: number | null, maxQuantity?: number | null, purchasePeriod?: string | null, imageURL: string, variantSku?: string | null, totalLastPeriod?: number | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, offer: { __typename?: 'OfferResume', uuidOffer: string, offerName: string, description: string, type: OfferType, termConditions?: string | null, uuiddepartment?: string | null, uuidcampaign?: string | null } } }> }> } | null };

export type PromotionsCartQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionsCartQuery = { __typename?: 'Query', cart?: { __typename?: 'Cart', uuidcart: string, uuidcollaborator: string, creationdate: any, updatedate: any, status: string, expirationdate?: any | null, total: number, purchaseNumber: string, discounts?: Array<{ __typename?: 'CartPromotionDiscount', uuidpromotiondiscount: string, uuidinfo: string, promotiondiscountvalue: number, type: string }> | null, billingInfo?: { __typename?: 'BillingInfo', uuidbillinginfo: string, phone?: string | null, ruc?: string | null, businessname?: string | null, fiscaladdress?: string | null } | null, deliveryInfo?: { __typename?: 'DeliveryInfo', uuiddeliveryinfo: string, receivername?: string | null, receiverphone?: string | null, receiverdocumentkind?: string | null, receiverdocumentnumber?: string | null, collaboratoraddress?: { __typename?: 'CollaboratorAddress', uuidcollaboratoraddress: string } | null } | null, suborders: Array<{ __typename?: 'CartSubOrder', uuidpromotionfreedelivery?: string | null, uuidcartsuborder: string, uuidcart: string, uuidbusiness: string, uuidaddress?: string | null, businessName: string, deliverymethod?: string | null, deliveryprice?: number | null, deliverytime?: string | null, type?: string | null, availableDeliveryMethods?: { __typename?: 'AvailableDeliveryMethods', online: boolean, onhome: boolean, onstore: boolean, deliveryOnHome?: { __typename?: 'DeliveryHome', currency?: string | null, price?: number | null, timetodelivery?: string | null, comments?: string | null } | null, deliveryOnStore?: Array<{ __typename?: 'DeliveryStore', uuiddeliverystore: string, name?: string | null, country?: string | null, department?: string | null, city?: string | null, district?: string | null, line?: string | null, timetodelivery?: string | null, comments?: string | null }> | null } | null, items: Array<{ __typename?: 'CartItem', uuidcartitem: string, uuidcartsuborder: string, uuidvariant: string, uuidoffer: string, quantity: number, subtotal: number, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, variant: { __typename?: 'VariantDetailed', uuidVariant: string, currency: string, stock: number, totalStock: number, refPrice: number, adflyPrice: number, offerPrice?: number | null, maxQuantity?: number | null, purchasePeriod?: string | null, imageURL: string, variantSku?: string | null, totalLastPeriod?: number | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, offer: { __typename?: 'OfferResume', uuidOffer: string, offerName: string, description: string, type: OfferType, termConditions?: string | null, uuiddepartment?: string | null, uuidcampaign?: string | null } } }> }> } | null };

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', id: string, name: string, description?: string | null, active: boolean, visible: boolean, outstanding: boolean, image?: string | null, section: string }> };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', uuidCategory: string, uuidDepartment: string, name: string, description?: string | null, active: boolean, visible: boolean, subCategories: Array<{ __typename?: 'SubCategory', uuidSubCategory: string, name: string, description?: string | null, active: boolean, visible: boolean }> }> };

export type SubcategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SubcategoriesQuery = { __typename?: 'Query', subcategories: Array<{ __typename?: 'SubCategory', uuidSubCategory: string, uuidCategory: string, name: string, description?: string | null, active: boolean, visible: boolean }> };

export type BrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandsQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', id: string, name: string }> };

export type CampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignsQuery = { __typename?: 'Query', campaigns: Array<{ __typename?: 'Campaign', uuidcampaign: string, name: string, description?: string | null }> };

export type AvailablePromotionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailablePromotionsQuery = { __typename?: 'Query', availablePromotions: Array<{ __typename?: 'Promotion', uuidpromotion: string, promotionname: string, initialdate: any, duedate: any, state: string }> };

export type StoreDesignQueryVariables = Exact<{
  subdomain: Scalars['String']['input'];
}>;


export type StoreDesignQuery = { __typename?: 'Query', storeDesign: { __typename?: 'DesignConfig', ispremium?: boolean | null, fontcolor: string, backcolor: string, logourl: string, bannerurl: string, commercialname?: string | null, href?: string | null } };

export type BannersQueryVariables = Exact<{ [key: string]: never; }>;


export type BannersQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'AdflyBanner', uuidbanner: string, bannerimageurl?: string | null, bannerlink?: string | null, priority?: number | null, creationdate: any, updatedate: any }> };

export type BannersListsQueryVariables = Exact<{ [key: string]: never; }>;


export type BannersListsQuery = { __typename?: 'Query', activeBannersLists: Array<{ __typename?: 'SecondaryBannersList', uuidbannerlist: string, name: string, pos: number, active: boolean, banners: Array<{ __typename?: 'SecondaryBanner', uuidbannerlistdetail: string, imgurl: string, linkurl: string }> }> };

export type HomeListsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeListsQuery = { __typename?: 'Query', activeHomeLists: Array<{ __typename?: 'HomeList', uuidhomelist: string, name: string, section: string, products: Array<string>, creationdate: any, updatedate: any, pos: number, active: boolean, productsList?: Array<{ __typename?: 'Offer', uuidOffer: string, offerName: string, description: string, principalSku?: string | null, type: OfferType, creationDate: any, updateDate: any, tags: Array<string>, status?: string | null, details?: { __typename?: 'OfferDetails', refPrice: number, adflyPrice: number, offerPrice?: number | null, imageURL: string, discountType?: string | null, discount?: number | null } | null, brand: { __typename?: 'Brand', name: string }, department: { __typename?: 'Department', name: string }, business: { __typename?: 'Business', uuidbusiness: string, businessname: string, commercialname: string, deliveryMethods?: { __typename?: 'DeliveryMethods', deliveryonline: boolean, deliveryonhome: boolean, deliveryonstore: boolean } | null }, category: { __typename?: 'Category', name: string }, subCategory: { __typename?: 'SubCategory', name: string } }> | null }> };

export type CollaboratorOrdersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filters?: InputMaybe<CollaboratorOrderFilterInput>;
  sort?: InputMaybe<CollaboratorOrderSortInput>;
}>;


export type CollaboratorOrdersQuery = { __typename?: 'Query', collaboratorOrders: { __typename?: 'CollaboratorOrderConnection', totalCount: number, edges: Array<{ __typename?: 'CollaboratorOrderEdge', node: { __typename?: 'CollaboratorOrderRow', uuidorder: string, purchasenumber: string, creationdate: any, updatedate: any, status: string, total: number } }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number } } };

export type OrderReportQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderReportQuery = { __typename?: 'Query', collaboratorOrder?: { __typename?: 'OrderReport', order: { __typename?: 'Order', starsUsed?: number | null, starspurchasenumber?: string | null, comments?: string | null, uuidOrder: string, uuidCollaborator: string, creationDate: any, status: string, total: number, igv: number, finalTotal: number, totalIgv: number, deliveryPrice: number, businessName: string, details?: { __typename?: 'OrderDetails', cartdiscount?: number | null, partnersdiscount?: number | null, isreceiver?: boolean | null, isbilling?: boolean | null, collaborator?: { __typename?: 'OrderDetailsCollaborator', name?: string | null, lastname?: string | null, documenttype?: string | null, documentnumber?: string | null, email?: string | null, phonenumber?: string | null } | null, billingInfo?: { __typename?: 'OrderDetailsBilling', phone?: string | null, ruc?: string | null, businessname?: string | null, fiscaladdress?: string | null } | null, deliveryInfo?: { __typename?: 'OrderDetailsDelivery', receivername?: string | null, receiverdocumentkind?: string | null, receiverdocumentnumber?: string | null, phone?: string | null } | null } | null, suborders: Array<{ __typename?: 'Suborder', comments?: string | null, uuidBusiness: string, businessName: string, sellerName: string, deliveryMethod?: string | null, deliveryPrice?: number | null, deliveryTime?: string | null, total: number, status: string, details?: { __typename?: 'SubOrderDetails', discount?: number | null, name?: string | null, country?: string | null, department?: string | null, province?: string | null, district?: string | null, address?: string | null, comments?: string | null } | null, items: Array<{ __typename?: 'SuborderItem', uuidorderitem: string, uuidsuborder: string, uuidvariant: string, quantity: number, subtotal: number, details?: { __typename?: 'ItemDetails', type?: string | null, description?: string | null, refprice?: number | null, adflyprice?: number | null, offerprice?: number | null, imageurl?: string | null, variantsku?: string | null, productname?: string | null, termsconditions?: string | null, principalsku?: string | null, uuidbrand?: string | null, uuiddepartment?: string | null, uuidcategory?: string | null, uuidsubcategory?: string | null, uuidbusiness?: string | null, initialdate?: string | null, expirationdate?: string | null, initialpurchasedate?: string | null, expirationpurchasedate?: string | null, accessservice?: string | null, contentservice?: string | null, servicesCodes?: Array<string> | null, specification?: string | null, condition?: string | null, conditiondetails?: string | null, productwarranty?: string | null, sellerwarranty?: string | null, included?: string | null, width?: number | null, height?: number | null, weight?: number | null, length?: number | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }> } | null }> }>, paymentInfo?: { __typename?: 'PaymentInfo', canal?: string | null, card?: string | null, brand?: string | null, purchaseNumber?: string | null } | null }, collaborator: { __typename?: 'Collaborator', name: string, lastname: string, documenttype: string, documentnumber: string, phonenumber?: string | null, email?: string | null } } | null };

export type CollaboratorCouponsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filters?: InputMaybe<CollaboratorCouponFilterInput>;
  sort?: InputMaybe<CollaboratorCouponSortInput>;
}>;


export type CollaboratorCouponsQuery = { __typename?: 'Query', collaboratorCoupons: { __typename?: 'CollaboratorCouponConnection', totalCount: number, edges: Array<{ __typename?: 'CollaboratorCouponEdge', node: { __typename?: 'CouponUsage', uuidcouponcollaboratorusage: string, uuidcollaborator: string, businessname?: string | null, dateused?: any | null, type?: string | null, uuidproduct: string, uuidvariant: string } }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number } } };

export type CouponReportQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CouponReportQuery = { __typename?: 'Query', collaboratorCouponUsage?: { __typename?: 'CouponUsage', uuidcouponcollaboratorusage: string, uuidcollaborator: string, uuidproduct: string, uuidvariant: string, businessname?: string | null, dateused?: any | null, type?: string | null, couponcode?: string | null, couponData?: { __typename?: 'Coupon', initialDate: any, expirationDate: any, initialPurchaseDate: any, expirationPurchaseDate: any, couponUsage: string, couponContent: string, discountType: string, discount: number, couponCode?: string | null } | null, variant?: { __typename?: 'VariantDetailed', uuidVariant: string, currency: string, stock: number, refPrice: number, adflyPrice: number, offerPrice?: number | null, maxQuantity?: number | null, imageURL: string, variantSku?: string | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, offer: { __typename?: 'OfferResume', offerName: string, description: string, type: OfferType, termConditions?: string | null } } | null } | null };

export type ProductQueryVariables = Exact<{
  uuidproduct: Scalars['ID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', offerForCollaborator?: { __typename?: 'OfferForCollaborator', totalLastPeriod?: number | null, lastcoupon?: string | null, offer: { __typename?: 'Offer', uuidOffer: string, offerName: string, description: string, principalSku?: string | null, type: OfferType, creationDate: any, updateDate: any, tags: Array<string>, rejectionComment?: string | null, status?: string | null, termConditions?: string | null, brand: { __typename?: 'Brand', name: string }, offerAttributes: Array<{ __typename?: 'OfferAttribute', attributeName: string, attribute: { __typename?: 'Attribute', attributeName: string, values: Array<string> } }>, department: { __typename?: 'Department', name: string }, category: { __typename?: 'Category', name: string }, subCategory: { __typename?: 'SubCategory', name: string }, business: { __typename?: 'Business', uuidbusiness: string, businessname: string, commercialname: string, deliveryMethods?: { __typename?: 'DeliveryMethods', deliveryonline: boolean, deliveryonhome: boolean, deliveryonstore: boolean } | null }, variant: Array<{ __typename?: 'Variant', uuidVariant: string, currency: string, stock: number, refPrice: number, adflyPrice: number, offerPrice?: number | null, maxQuantity?: number | null, purchasePeriod?: string | null, imageURL: string, additionalimages: Array<string>, variantSku?: string | null, attributes: Array<{ __typename?: 'VariantAttribute', attributeName: string, value: string }>, product?: { __typename?: 'Product', specification?: string | null, condition: string, conditionDetails?: string | null, productWarranty?: string | null, sellerWarranty?: string | null, included?: string | null, width?: number | null, height?: number | null, weight?: number | null, length?: number | null } | null, coupon?: { __typename?: 'Coupon', initialDate: any, expirationDate: any, initialPurchaseDate: any, expirationPurchaseDate: any, couponUsage: string, couponContent: string, discountType: string, discount: number } | null, service?: { __typename?: 'Service', initialDate: any, expirationDate: any, initialPurchaseDate: any, expirationPurchaseDate: any, accessService: string, contentService: string } | null }> } } | null };

export type GetCollaboratorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollaboratorQuery = { __typename?: 'Query', collaborator: { __typename?: 'Collaborator', uuidcollaborator: string, name: string, lastname: string, documenttype: string, documentnumber: string, phonenumber?: string | null, email?: string | null, status?: string | null, changePassword: boolean, emailVerify: boolean, urlprofile?: string | null, stars?: number | null, newsletters: boolean, preferences?: { __typename?: 'CollaboratorPreferences', whatdoyouwant?: Array<string> | null, topproducts?: Array<string> | null, topservices?: Array<string> | null, toppromotions?: Array<string> | null, prefercommunication?: Array<string> | null, otherprefercommunication?: string | null } | null } };

export type GetAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressesQuery = { __typename?: 'Query', collaboratoraddresses: Array<{ __typename?: 'CollaboratorAddress', uuidcollaboratoraddress: string, alias: string, address: string, lat: number, lng: number, district: string, province: string, department: string, country: string, additional?: string | null }> };

export type CollaboratorStarsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filters?: InputMaybe<CollaboratorStarsFilterInput>;
  sort?: InputMaybe<CollaboratorStarsSortInput>;
}>;


export type CollaboratorStarsQuery = { __typename?: 'Query', collaboratorStars: { __typename?: 'CollaboratorStarsConnection', totalCount: number, edges: Array<{ __typename?: 'CollaboratorStarsEdge', node: { __typename?: 'CollaboratorStars', uuidstars: string, creationdate: any, operation: string, amount: number, responsiblename?: string | null, responsiblelastname?: string | null, message?: string | null, reason?: string | null, uuidorder?: string | null } }>, pageInfo: { __typename?: 'PageInfo', currentPage: number, totalPages: number } } };


export const CartDocument = gql`
    query Cart {
  cart {
    uuidcart
    uuidcollaborator
    creationdate
    updatedate
    status
    expirationdate
    total
    billingInfo {
      uuidbillinginfo
      phone
      ruc
      businessname
      fiscaladdress
    }
    deliveryInfo {
      uuiddeliveryinfo
      collaboratoraddress {
        uuidcollaboratoraddress
      }
      receivername
      receiverphone
      receiverdocumentkind
      receiverdocumentnumber
    }
    suborders {
      uuidcartsuborder
      uuidcart
      uuidbusiness
      uuidaddress
      businessName
      deliverymethod
      deliveryprice
      deliverytime
      type
      availableDeliveryMethods {
        online
        onhome
        onstore
        deliveryOnHome {
          currency
          price
          timetodelivery
          comments
        }
        deliveryOnStore {
          uuiddeliverystore
          name
          country
          department
          city
          district
          line
          timetodelivery
          comments
        }
      }
      items {
        uuidcartitem
        uuidcartsuborder
        uuidvariant
        uuidoffer
        attributes {
          attributeName
          value
        }
        variant {
          uuidVariant
          attributes {
            attributeName
            value
          }
          currency
          stock
          totalStock
          refPrice
          adflyPrice
          offerPrice
          maxQuantity
          purchasePeriod
          imageURL
          variantSku
          totalLastPeriod
          offer {
            uuidOffer
            offerName
            description
            type
            termConditions
            uuiddepartment
            uuidcampaign
          }
        }
        quantity
        subtotal
      }
    }
    purchaseNumber
  }
}
    `;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(baseOptions?: Apollo.QueryHookOptions<CartQuery, CartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
      }
export function useCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export function useCartSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartSuspenseQueryHookResult = ReturnType<typeof useCartSuspenseQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
export const SimpleCartDocument = gql`
    query SimpleCart {
  simpleCart {
    uuidcart
    total
    purchaseNumber
    suborders {
      uuidcartsuborder
      uuidbusiness
      uuidaddress
      deliverymethod
      deliveryprice
      deliverytime
      type
      items {
        uuidcartitem
        quantity
        subtotal
        variant {
          uuidVariant
          attributes {
            attributeName
            value
          }
          currency
          stock
          totalStock
          refPrice
          adflyPrice
          offerPrice
          maxQuantity
          purchasePeriod
          imageURL
          variantSku
          totalLastPeriod
          offer {
            uuidOffer
            offerName
            description
            type
            termConditions
            uuiddepartment
            uuidcampaign
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSimpleCartQuery__
 *
 * To run a query within a React component, call `useSimpleCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleCartQuery(baseOptions?: Apollo.QueryHookOptions<SimpleCartQuery, SimpleCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimpleCartQuery, SimpleCartQueryVariables>(SimpleCartDocument, options);
      }
export function useSimpleCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimpleCartQuery, SimpleCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimpleCartQuery, SimpleCartQueryVariables>(SimpleCartDocument, options);
        }
export function useSimpleCartSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SimpleCartQuery, SimpleCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SimpleCartQuery, SimpleCartQueryVariables>(SimpleCartDocument, options);
        }
export type SimpleCartQueryHookResult = ReturnType<typeof useSimpleCartQuery>;
export type SimpleCartLazyQueryHookResult = ReturnType<typeof useSimpleCartLazyQuery>;
export type SimpleCartSuspenseQueryHookResult = ReturnType<typeof useSimpleCartSuspenseQuery>;
export type SimpleCartQueryResult = Apollo.QueryResult<SimpleCartQuery, SimpleCartQueryVariables>;
export const PromotionsCartDocument = gql`
    query PromotionsCart {
  cart {
    discounts {
      uuidpromotiondiscount
      uuidinfo
      promotiondiscountvalue
      type
    }
    uuidcart
    uuidcollaborator
    creationdate
    updatedate
    status
    expirationdate
    total
    billingInfo {
      uuidbillinginfo
      phone
      ruc
      businessname
      fiscaladdress
    }
    deliveryInfo {
      uuiddeliveryinfo
      collaboratoraddress {
        uuidcollaboratoraddress
      }
      receivername
      receiverphone
      receiverdocumentkind
      receiverdocumentnumber
    }
    suborders {
      uuidpromotionfreedelivery
      uuidcartsuborder
      uuidcart
      uuidbusiness
      uuidaddress
      businessName
      deliverymethod
      deliveryprice
      deliverytime
      type
      availableDeliveryMethods {
        online
        onhome
        onstore
        deliveryOnHome {
          currency
          price
          timetodelivery
          comments
        }
        deliveryOnStore {
          uuiddeliverystore
          name
          country
          department
          city
          district
          line
          timetodelivery
          comments
        }
      }
      items {
        uuidcartitem
        uuidcartsuborder
        uuidvariant
        uuidoffer
        attributes {
          attributeName
          value
        }
        variant {
          uuidVariant
          attributes {
            attributeName
            value
          }
          currency
          stock
          totalStock
          refPrice
          adflyPrice
          offerPrice
          maxQuantity
          purchasePeriod
          imageURL
          variantSku
          totalLastPeriod
          offer {
            uuidOffer
            offerName
            description
            type
            termConditions
            uuiddepartment
            uuidcampaign
          }
        }
        quantity
        subtotal
      }
    }
    purchaseNumber
  }
}
    `;

/**
 * __usePromotionsCartQuery__
 *
 * To run a query within a React component, call `usePromotionsCartQuery` and pass it any options that fit your needs.
 * When your component renders, `usePromotionsCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePromotionsCartQuery({
 *   variables: {
 *   },
 * });
 */
export function usePromotionsCartQuery(baseOptions?: Apollo.QueryHookOptions<PromotionsCartQuery, PromotionsCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PromotionsCartQuery, PromotionsCartQueryVariables>(PromotionsCartDocument, options);
      }
export function usePromotionsCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PromotionsCartQuery, PromotionsCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PromotionsCartQuery, PromotionsCartQueryVariables>(PromotionsCartDocument, options);
        }
export function usePromotionsCartSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PromotionsCartQuery, PromotionsCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PromotionsCartQuery, PromotionsCartQueryVariables>(PromotionsCartDocument, options);
        }
export type PromotionsCartQueryHookResult = ReturnType<typeof usePromotionsCartQuery>;
export type PromotionsCartLazyQueryHookResult = ReturnType<typeof usePromotionsCartLazyQuery>;
export type PromotionsCartSuspenseQueryHookResult = ReturnType<typeof usePromotionsCartSuspenseQuery>;
export type PromotionsCartQueryResult = Apollo.QueryResult<PromotionsCartQuery, PromotionsCartQueryVariables>;
export const DepartmentsDocument = gql`
    query Departments {
  departments {
    id
    name
    description
    active
    visible
    outstanding
    image
    section
  }
}
    `;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
      }
export function useDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export function useDepartmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsSuspenseQueryHookResult = ReturnType<typeof useDepartmentsSuspenseQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    uuidCategory
    uuidDepartment
    name
    description
    active
    visible
    subCategories {
      uuidSubCategory
      name
      description
      active
      visible
    }
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export function useCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const SubcategoriesDocument = gql`
    query Subcategories {
  subcategories {
    uuidSubCategory
    uuidCategory
    name
    description
    active
    visible
  }
}
    `;

/**
 * __useSubcategoriesQuery__
 *
 * To run a query within a React component, call `useSubcategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubcategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubcategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSubcategoriesQuery(baseOptions?: Apollo.QueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
      }
export function useSubcategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
        }
export function useSubcategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SubcategoriesQuery, SubcategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SubcategoriesQuery, SubcategoriesQueryVariables>(SubcategoriesDocument, options);
        }
export type SubcategoriesQueryHookResult = ReturnType<typeof useSubcategoriesQuery>;
export type SubcategoriesLazyQueryHookResult = ReturnType<typeof useSubcategoriesLazyQuery>;
export type SubcategoriesSuspenseQueryHookResult = ReturnType<typeof useSubcategoriesSuspenseQuery>;
export type SubcategoriesQueryResult = Apollo.QueryResult<SubcategoriesQuery, SubcategoriesQueryVariables>;
export const BrandsDocument = gql`
    query Brands {
  brands {
    id
    name
  }
}
    `;

/**
 * __useBrandsQuery__
 *
 * To run a query within a React component, call `useBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandsQuery(baseOptions?: Apollo.QueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, options);
      }
export function useBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, options);
        }
export function useBrandsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, options);
        }
export type BrandsQueryHookResult = ReturnType<typeof useBrandsQuery>;
export type BrandsLazyQueryHookResult = ReturnType<typeof useBrandsLazyQuery>;
export type BrandsSuspenseQueryHookResult = ReturnType<typeof useBrandsSuspenseQuery>;
export type BrandsQueryResult = Apollo.QueryResult<BrandsQuery, BrandsQueryVariables>;
export const CampaignsDocument = gql`
    query Campaigns {
  campaigns {
    uuidcampaign
    name
    description
  }
}
    `;

/**
 * __useCampaignsQuery__
 *
 * To run a query within a React component, call `useCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCampaignsQuery(baseOptions?: Apollo.QueryHookOptions<CampaignsQuery, CampaignsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignsQuery, CampaignsQueryVariables>(CampaignsDocument, options);
      }
export function useCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignsQuery, CampaignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignsQuery, CampaignsQueryVariables>(CampaignsDocument, options);
        }
export function useCampaignsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CampaignsQuery, CampaignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CampaignsQuery, CampaignsQueryVariables>(CampaignsDocument, options);
        }
export type CampaignsQueryHookResult = ReturnType<typeof useCampaignsQuery>;
export type CampaignsLazyQueryHookResult = ReturnType<typeof useCampaignsLazyQuery>;
export type CampaignsSuspenseQueryHookResult = ReturnType<typeof useCampaignsSuspenseQuery>;
export type CampaignsQueryResult = Apollo.QueryResult<CampaignsQuery, CampaignsQueryVariables>;
export const AvailablePromotionsDocument = gql`
    query AvailablePromotions {
  availablePromotions {
    uuidpromotion
    promotionname
    initialdate
    duedate
    state
  }
}
    `;

/**
 * __useAvailablePromotionsQuery__
 *
 * To run a query within a React component, call `useAvailablePromotionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailablePromotionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailablePromotionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailablePromotionsQuery(baseOptions?: Apollo.QueryHookOptions<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>(AvailablePromotionsDocument, options);
      }
export function useAvailablePromotionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>(AvailablePromotionsDocument, options);
        }
export function useAvailablePromotionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>(AvailablePromotionsDocument, options);
        }
export type AvailablePromotionsQueryHookResult = ReturnType<typeof useAvailablePromotionsQuery>;
export type AvailablePromotionsLazyQueryHookResult = ReturnType<typeof useAvailablePromotionsLazyQuery>;
export type AvailablePromotionsSuspenseQueryHookResult = ReturnType<typeof useAvailablePromotionsSuspenseQuery>;
export type AvailablePromotionsQueryResult = Apollo.QueryResult<AvailablePromotionsQuery, AvailablePromotionsQueryVariables>;
export const StoreDesignDocument = gql`
    query StoreDesign($subdomain: String!) {
  storeDesign(subdomain: $subdomain) {
    ispremium
    fontcolor
    backcolor
    logourl
    bannerurl
    commercialname
    href
  }
}
    `;

/**
 * __useStoreDesignQuery__
 *
 * To run a query within a React component, call `useStoreDesignQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoreDesignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoreDesignQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useStoreDesignQuery(baseOptions: Apollo.QueryHookOptions<StoreDesignQuery, StoreDesignQueryVariables> & ({ variables: StoreDesignQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreDesignQuery, StoreDesignQueryVariables>(StoreDesignDocument, options);
      }
export function useStoreDesignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreDesignQuery, StoreDesignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreDesignQuery, StoreDesignQueryVariables>(StoreDesignDocument, options);
        }
export function useStoreDesignSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StoreDesignQuery, StoreDesignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StoreDesignQuery, StoreDesignQueryVariables>(StoreDesignDocument, options);
        }
export type StoreDesignQueryHookResult = ReturnType<typeof useStoreDesignQuery>;
export type StoreDesignLazyQueryHookResult = ReturnType<typeof useStoreDesignLazyQuery>;
export type StoreDesignSuspenseQueryHookResult = ReturnType<typeof useStoreDesignSuspenseQuery>;
export type StoreDesignQueryResult = Apollo.QueryResult<StoreDesignQuery, StoreDesignQueryVariables>;
export const BannersDocument = gql`
    query Banners {
  banners {
    uuidbanner
    bannerimageurl
    bannerlink
    priority
    creationdate
    updatedate
  }
}
    `;

/**
 * __useBannersQuery__
 *
 * To run a query within a React component, call `useBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useBannersQuery(baseOptions?: Apollo.QueryHookOptions<BannersQuery, BannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannersQuery, BannersQueryVariables>(BannersDocument, options);
      }
export function useBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannersQuery, BannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannersQuery, BannersQueryVariables>(BannersDocument, options);
        }
export function useBannersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BannersQuery, BannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BannersQuery, BannersQueryVariables>(BannersDocument, options);
        }
export type BannersQueryHookResult = ReturnType<typeof useBannersQuery>;
export type BannersLazyQueryHookResult = ReturnType<typeof useBannersLazyQuery>;
export type BannersSuspenseQueryHookResult = ReturnType<typeof useBannersSuspenseQuery>;
export type BannersQueryResult = Apollo.QueryResult<BannersQuery, BannersQueryVariables>;
export const BannersListsDocument = gql`
    query BannersLists {
  activeBannersLists {
    uuidbannerlist
    name
    banners {
      uuidbannerlistdetail
      imgurl
      linkurl
    }
    pos
    active
  }
}
    `;

/**
 * __useBannersListsQuery__
 *
 * To run a query within a React component, call `useBannersListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannersListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannersListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBannersListsQuery(baseOptions?: Apollo.QueryHookOptions<BannersListsQuery, BannersListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannersListsQuery, BannersListsQueryVariables>(BannersListsDocument, options);
      }
export function useBannersListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannersListsQuery, BannersListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannersListsQuery, BannersListsQueryVariables>(BannersListsDocument, options);
        }
export function useBannersListsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BannersListsQuery, BannersListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BannersListsQuery, BannersListsQueryVariables>(BannersListsDocument, options);
        }
export type BannersListsQueryHookResult = ReturnType<typeof useBannersListsQuery>;
export type BannersListsLazyQueryHookResult = ReturnType<typeof useBannersListsLazyQuery>;
export type BannersListsSuspenseQueryHookResult = ReturnType<typeof useBannersListsSuspenseQuery>;
export type BannersListsQueryResult = Apollo.QueryResult<BannersListsQuery, BannersListsQueryVariables>;
export const HomeListsDocument = gql`
    query HomeLists {
  activeHomeLists {
    uuidhomelist
    name
    section
    products
    productsList {
      uuidOffer
      offerName
      description
      principalSku
      type
      creationDate
      updateDate
      tags
      details {
        refPrice
        adflyPrice
        offerPrice
        imageURL
        discountType
        discount
      }
      brand {
        name
      }
      department {
        name
      }
      business {
        uuidbusiness
        businessname
        commercialname
        deliveryMethods {
          deliveryonline
          deliveryonhome
          deliveryonstore
        }
      }
      category {
        name
      }
      subCategory {
        name
      }
      status
    }
    creationdate
    updatedate
    pos
    active
  }
}
    `;

/**
 * __useHomeListsQuery__
 *
 * To run a query within a React component, call `useHomeListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeListsQuery(baseOptions?: Apollo.QueryHookOptions<HomeListsQuery, HomeListsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeListsQuery, HomeListsQueryVariables>(HomeListsDocument, options);
      }
export function useHomeListsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeListsQuery, HomeListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeListsQuery, HomeListsQueryVariables>(HomeListsDocument, options);
        }
export function useHomeListsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HomeListsQuery, HomeListsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HomeListsQuery, HomeListsQueryVariables>(HomeListsDocument, options);
        }
export type HomeListsQueryHookResult = ReturnType<typeof useHomeListsQuery>;
export type HomeListsLazyQueryHookResult = ReturnType<typeof useHomeListsLazyQuery>;
export type HomeListsSuspenseQueryHookResult = ReturnType<typeof useHomeListsSuspenseQuery>;
export type HomeListsQueryResult = Apollo.QueryResult<HomeListsQuery, HomeListsQueryVariables>;
export const CollaboratorOrdersDocument = gql`
    query collaboratorOrders($page: Int!, $limit: Int!, $filters: CollaboratorOrderFilterInput, $sort: CollaboratorOrderSortInput) {
  collaboratorOrders(page: $page, limit: $limit, filter: $filters, sort: $sort) {
    totalCount
    edges {
      node {
        uuidorder
        purchasenumber
        creationdate
        updatedate
        status
        total
      }
    }
    pageInfo {
      currentPage
      totalPages
    }
  }
}
    `;

/**
 * __useCollaboratorOrdersQuery__
 *
 * To run a query within a React component, call `useCollaboratorOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollaboratorOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollaboratorOrdersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCollaboratorOrdersQuery(baseOptions: Apollo.QueryHookOptions<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables> & ({ variables: CollaboratorOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>(CollaboratorOrdersDocument, options);
      }
export function useCollaboratorOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>(CollaboratorOrdersDocument, options);
        }
export function useCollaboratorOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>(CollaboratorOrdersDocument, options);
        }
export type CollaboratorOrdersQueryHookResult = ReturnType<typeof useCollaboratorOrdersQuery>;
export type CollaboratorOrdersLazyQueryHookResult = ReturnType<typeof useCollaboratorOrdersLazyQuery>;
export type CollaboratorOrdersSuspenseQueryHookResult = ReturnType<typeof useCollaboratorOrdersSuspenseQuery>;
export type CollaboratorOrdersQueryResult = Apollo.QueryResult<CollaboratorOrdersQuery, CollaboratorOrdersQueryVariables>;
export const OrderReportDocument = gql`
    query orderReport($id: ID!) {
  collaboratorOrder(uuidorder: $id) {
    order {
      starsUsed
      starspurchasenumber
      comments
      uuidOrder
      uuidCollaborator
      creationDate
      status
      total
      igv
      finalTotal
      totalIgv
      deliveryPrice
      businessName
      details {
        cartdiscount
        partnersdiscount
        collaborator {
          name
          lastname
          documenttype
          documentnumber
          email
          phonenumber
        }
        billingInfo {
          phone
          ruc
          businessname
          fiscaladdress
        }
        deliveryInfo {
          receivername
          receiverdocumentkind
          receiverdocumentnumber
          phone
        }
        isreceiver
        isbilling
      }
      suborders {
        comments
        uuidBusiness
        businessName
        sellerName
        deliveryMethod
        deliveryPrice
        deliveryTime
        details {
          discount
          name
          country
          department
          province
          district
          address
          comments
        }
        total
        status
        items {
          uuidorderitem
          uuidsuborder
          uuidvariant
          quantity
          subtotal
          details {
            type
            description
            refprice
            adflyprice
            offerprice
            imageurl
            variantsku
            productname
            termsconditions
            principalsku
            attributes {
              attributeName
              value
            }
            uuidbrand
            uuiddepartment
            uuidcategory
            uuidsubcategory
            uuidbusiness
            initialdate
            expirationdate
            initialpurchasedate
            expirationpurchasedate
            accessservice
            contentservice
            servicesCodes
            specification
            condition
            conditiondetails
            productwarranty
            sellerwarranty
            included
            width
            height
            weight
            length
          }
        }
      }
      paymentInfo {
        canal
        card
        brand
        purchaseNumber
      }
    }
    collaborator {
      name
      lastname
      documenttype
      documentnumber
      phonenumber
      email
    }
  }
}
    `;

/**
 * __useOrderReportQuery__
 *
 * To run a query within a React component, call `useOrderReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderReportQuery(baseOptions: Apollo.QueryHookOptions<OrderReportQuery, OrderReportQueryVariables> & ({ variables: OrderReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderReportQuery, OrderReportQueryVariables>(OrderReportDocument, options);
      }
export function useOrderReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderReportQuery, OrderReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderReportQuery, OrderReportQueryVariables>(OrderReportDocument, options);
        }
export function useOrderReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrderReportQuery, OrderReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderReportQuery, OrderReportQueryVariables>(OrderReportDocument, options);
        }
export type OrderReportQueryHookResult = ReturnType<typeof useOrderReportQuery>;
export type OrderReportLazyQueryHookResult = ReturnType<typeof useOrderReportLazyQuery>;
export type OrderReportSuspenseQueryHookResult = ReturnType<typeof useOrderReportSuspenseQuery>;
export type OrderReportQueryResult = Apollo.QueryResult<OrderReportQuery, OrderReportQueryVariables>;
export const CollaboratorCouponsDocument = gql`
    query collaboratorCoupons($page: Int!, $limit: Int!, $filters: CollaboratorCouponFilterInput, $sort: CollaboratorCouponSortInput) {
  collaboratorCoupons(page: $page, limit: $limit, filter: $filters, sort: $sort) {
    totalCount
    edges {
      node {
        uuidcouponcollaboratorusage
        uuidcollaborator
        businessname
        dateused
        type
        uuidproduct
        uuidvariant
      }
    }
    pageInfo {
      currentPage
      totalPages
    }
  }
}
    `;

/**
 * __useCollaboratorCouponsQuery__
 *
 * To run a query within a React component, call `useCollaboratorCouponsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollaboratorCouponsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollaboratorCouponsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCollaboratorCouponsQuery(baseOptions: Apollo.QueryHookOptions<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables> & ({ variables: CollaboratorCouponsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>(CollaboratorCouponsDocument, options);
      }
export function useCollaboratorCouponsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>(CollaboratorCouponsDocument, options);
        }
export function useCollaboratorCouponsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>(CollaboratorCouponsDocument, options);
        }
export type CollaboratorCouponsQueryHookResult = ReturnType<typeof useCollaboratorCouponsQuery>;
export type CollaboratorCouponsLazyQueryHookResult = ReturnType<typeof useCollaboratorCouponsLazyQuery>;
export type CollaboratorCouponsSuspenseQueryHookResult = ReturnType<typeof useCollaboratorCouponsSuspenseQuery>;
export type CollaboratorCouponsQueryResult = Apollo.QueryResult<CollaboratorCouponsQuery, CollaboratorCouponsQueryVariables>;
export const CouponReportDocument = gql`
    query couponReport($id: ID!) {
  collaboratorCouponUsage(uuidcouponcollaboratorusage: $id) {
    uuidcouponcollaboratorusage
    uuidcollaborator
    uuidproduct
    uuidvariant
    businessname
    dateused
    type
    couponcode
    couponData {
      initialDate
      expirationDate
      initialPurchaseDate
      expirationPurchaseDate
      couponUsage
      couponContent
      discountType
      discount
      couponCode
    }
    variant {
      uuidVariant
      attributes {
        attributeName
        value
      }
      currency
      stock
      refPrice
      adflyPrice
      offerPrice
      maxQuantity
      imageURL
      variantSku
      offer {
        offerName
        description
        type
        termConditions
      }
    }
  }
}
    `;

/**
 * __useCouponReportQuery__
 *
 * To run a query within a React component, call `useCouponReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useCouponReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCouponReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCouponReportQuery(baseOptions: Apollo.QueryHookOptions<CouponReportQuery, CouponReportQueryVariables> & ({ variables: CouponReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CouponReportQuery, CouponReportQueryVariables>(CouponReportDocument, options);
      }
export function useCouponReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CouponReportQuery, CouponReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CouponReportQuery, CouponReportQueryVariables>(CouponReportDocument, options);
        }
export function useCouponReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CouponReportQuery, CouponReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CouponReportQuery, CouponReportQueryVariables>(CouponReportDocument, options);
        }
export type CouponReportQueryHookResult = ReturnType<typeof useCouponReportQuery>;
export type CouponReportLazyQueryHookResult = ReturnType<typeof useCouponReportLazyQuery>;
export type CouponReportSuspenseQueryHookResult = ReturnType<typeof useCouponReportSuspenseQuery>;
export type CouponReportQueryResult = Apollo.QueryResult<CouponReportQuery, CouponReportQueryVariables>;
export const ProductDocument = gql`
    query Product($uuidproduct: ID!) {
  offerForCollaborator(uuidproduct: $uuidproduct) {
    offer {
      uuidOffer
      offerName
      description
      principalSku
      type
      creationDate
      updateDate
      tags
      rejectionComment
      status
      termConditions
      brand {
        name
      }
      offerAttributes {
        attribute {
          attributeName
          values
        }
        attributeName
      }
      department {
        name
      }
      category {
        name
      }
      subCategory {
        name
      }
      business {
        uuidbusiness
        businessname
        commercialname
        deliveryMethods {
          deliveryonline
          deliveryonhome
          deliveryonstore
        }
      }
      variant {
        uuidVariant
        attributes {
          attributeName
          value
        }
        currency
        stock
        refPrice
        adflyPrice
        offerPrice
        maxQuantity
        purchasePeriod
        imageURL
        additionalimages
        variantSku
        product {
          specification
          condition
          conditionDetails
          productWarranty
          sellerWarranty
          included
          width
          height
          weight
          length
        }
        coupon {
          initialDate
          expirationDate
          initialPurchaseDate
          expirationPurchaseDate
          couponUsage
          couponContent
          discountType
          discount
        }
        service {
          initialDate
          expirationDate
          initialPurchaseDate
          expirationPurchaseDate
          accessService
          contentService
        }
      }
    }
    totalLastPeriod
    lastcoupon
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      uuidproduct: // value for 'uuidproduct'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const GetCollaboratorDocument = gql`
    query getCollaborator {
  collaborator {
    uuidcollaborator
    name
    lastname
    documenttype
    documentnumber
    phonenumber
    email
    status
    changePassword
    emailVerify
    urlprofile
    stars
    newsletters
    preferences {
      whatdoyouwant
      topproducts
      topservices
      toppromotions
      prefercommunication
      otherprefercommunication
    }
  }
}
    `;

/**
 * __useGetCollaboratorQuery__
 *
 * To run a query within a React component, call `useGetCollaboratorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollaboratorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollaboratorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCollaboratorQuery(baseOptions?: Apollo.QueryHookOptions<GetCollaboratorQuery, GetCollaboratorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollaboratorQuery, GetCollaboratorQueryVariables>(GetCollaboratorDocument, options);
      }
export function useGetCollaboratorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollaboratorQuery, GetCollaboratorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollaboratorQuery, GetCollaboratorQueryVariables>(GetCollaboratorDocument, options);
        }
export function useGetCollaboratorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCollaboratorQuery, GetCollaboratorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCollaboratorQuery, GetCollaboratorQueryVariables>(GetCollaboratorDocument, options);
        }
export type GetCollaboratorQueryHookResult = ReturnType<typeof useGetCollaboratorQuery>;
export type GetCollaboratorLazyQueryHookResult = ReturnType<typeof useGetCollaboratorLazyQuery>;
export type GetCollaboratorSuspenseQueryHookResult = ReturnType<typeof useGetCollaboratorSuspenseQuery>;
export type GetCollaboratorQueryResult = Apollo.QueryResult<GetCollaboratorQuery, GetCollaboratorQueryVariables>;
export const GetAddressesDocument = gql`
    query getAddresses {
  collaboratoraddresses {
    uuidcollaboratoraddress
    alias
    address
    lat
    lng
    district
    province
    department
    country
    additional
  }
}
    `;

/**
 * __useGetAddressesQuery__
 *
 * To run a query within a React component, call `useGetAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddressesQuery(baseOptions?: Apollo.QueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, options);
      }
export function useGetAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, options);
        }
export function useGetAddressesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, options);
        }
export type GetAddressesQueryHookResult = ReturnType<typeof useGetAddressesQuery>;
export type GetAddressesLazyQueryHookResult = ReturnType<typeof useGetAddressesLazyQuery>;
export type GetAddressesSuspenseQueryHookResult = ReturnType<typeof useGetAddressesSuspenseQuery>;
export type GetAddressesQueryResult = Apollo.QueryResult<GetAddressesQuery, GetAddressesQueryVariables>;
export const CollaboratorStarsDocument = gql`
    query collaboratorStars($page: Int!, $limit: Int!, $filters: CollaboratorStarsFilterInput, $sort: CollaboratorStarsSortInput) {
  collaboratorStars(page: $page, limit: $limit, filter: $filters, sort: $sort) {
    totalCount
    edges {
      node {
        uuidstars
        creationdate
        operation
        amount
        responsiblename
        responsiblelastname
        message
        reason
        uuidorder
      }
    }
    pageInfo {
      currentPage
      totalPages
    }
  }
}
    `;

/**
 * __useCollaboratorStarsQuery__
 *
 * To run a query within a React component, call `useCollaboratorStarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollaboratorStarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollaboratorStarsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      filters: // value for 'filters'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCollaboratorStarsQuery(baseOptions: Apollo.QueryHookOptions<CollaboratorStarsQuery, CollaboratorStarsQueryVariables> & ({ variables: CollaboratorStarsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>(CollaboratorStarsDocument, options);
      }
export function useCollaboratorStarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>(CollaboratorStarsDocument, options);
        }
export function useCollaboratorStarsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>(CollaboratorStarsDocument, options);
        }
export type CollaboratorStarsQueryHookResult = ReturnType<typeof useCollaboratorStarsQuery>;
export type CollaboratorStarsLazyQueryHookResult = ReturnType<typeof useCollaboratorStarsLazyQuery>;
export type CollaboratorStarsSuspenseQueryHookResult = ReturnType<typeof useCollaboratorStarsSuspenseQuery>;
export type CollaboratorStarsQueryResult = Apollo.QueryResult<CollaboratorStarsQuery, CollaboratorStarsQueryVariables>;