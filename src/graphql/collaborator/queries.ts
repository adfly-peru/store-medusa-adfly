import { gql } from "@apollo/client";

const GET_COLLABORATOR = gql`
  query getCollaborator($uuidcollaborator: ID!) {
    collaborator(uuidcollaborator: $uuidcollaborator) {
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
    }
  }
`;

export { GET_COLLABORATOR };
