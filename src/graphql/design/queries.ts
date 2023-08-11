import { gql } from "@apollo/client";

const GET_LOGIN__DESIGN = gql`
  query getLoginDesign($subdomain: String!) {
    loginDesign(subdomain: $subdomain) {
      fontcolor
      backcolor
      logourl
      bannerurl
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
    }
  }
`;

export { GET_LOGIN__DESIGN, GET_HOME_DESIGN };
