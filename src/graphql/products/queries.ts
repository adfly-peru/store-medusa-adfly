import { gql } from "@apollo/client";

const GET_USER_PRODUCTS = gql`
  query getUserProducts($userId: ID!) {
    products(userId: $userId) {
      id
      name
      description
      price
    }
  }
`;

export { GET_USER_PRODUCTS };
