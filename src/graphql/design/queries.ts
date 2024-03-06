import { gql } from "@apollo/client";

const GET_LOGIN__DESIGN = gql`
  query getLoginDesign($subdomain: String!) {
    loginDesign(subdomain: $subdomain) {
      fontcolor
      backcolor
      logourl
      bannerurl
      commercialname
      href
    }
  }
`;

const GET_HOME_DESIGN = gql`
  query getHomeDesign($uuidcollaborator: ID!) {
    homeDesign(uuidcollaborator: $uuidcollaborator) {
      fontcolor
      backcolor
      logourl
      bannerurl
      commercialname
      href
    }
  }
`;

const GET_BANNERS = gql`
  query getAllBanners(
    $limit: Int
    $offset: Int
    $sortBy: String
    $asc: Boolean
  ) {
    getAllBanners(limit: $limit, offset: $offset, sortBy: $sortBy, asc: $asc) {
      banners {
        uuidbanner
        bannerimageurl
        bannerlink
        priority
        creationdate
        updatedate
      }
      total
    }
  }
`;

export { GET_LOGIN__DESIGN, GET_HOME_DESIGN, GET_BANNERS };
