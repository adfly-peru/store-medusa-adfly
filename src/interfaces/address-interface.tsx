interface Address {
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

export default Address;
