import { gql } from "@apollo/client";

const GET_STORE_PROPERTIES = gql`
  query getStoreProperties {
    store(userId: $userId) {
      id
      logo1
      logo2
    }
  }
`;

export { GET_STORE_PROPERTIES };
