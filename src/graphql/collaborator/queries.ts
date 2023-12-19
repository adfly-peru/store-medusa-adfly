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
      stars
    }
  }
`;

const GET_ADDRESSES = gql`
  query getAddresses($uuidcollaborator: ID!) {
    collaboratoraddresses(uuidcollaborator: $uuidcollaborator) {
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

export { GET_COLLABORATOR, GET_ADDRESSES };
