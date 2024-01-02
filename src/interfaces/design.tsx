export interface DesignConfig {
  commercialname?: string;
  fontcolor: string;
  backcolor: string;
  logourl: string;
  bannerurl: string;
}

export interface AdflyBanner {
  uuidbanner: string;
  bannerimageurl: string;
  bannerlink: string;
  priority: number;
  creationdate: string;
  updatedate: string;
}

export interface PaginatedAdflyBanners {
  banners: AdflyBanner[];
  total: number;
}
