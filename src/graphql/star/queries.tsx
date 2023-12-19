import { gql } from "@apollo/client";

const GET_STARS = gql`
  query collaboratorStars(
    $userId: ID!
    $limit: Int
    $offset: Int
    $sortBy: String
    $asc: Boolean
  ) {
    collaboratorStars(
      userId: $userId
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      asc: $asc
    ) {
      operations {
        uuidstars
        creationdate
        operation
        amount
        message
        reason
      }
      totalStars
    }
  }
`;

export { GET_STARS };
