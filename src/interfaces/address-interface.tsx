export interface Address {
  uuidcollaboratoraddress: string;
  alias: string;
  address: string;
  lat: number;
  lng: number;
  district: string;
  province: string;
  department: string;
  country: string;
  additional: string | null;
}

export interface AddressInfoForm {
  receivername: string;
  receiverdocumentkind: string;
  receiverdocumentnumber: string;
  receiverphone: string;
}
