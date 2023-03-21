import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query getProducts {
    products {
      uuidProduct
      productName
      description
      type
      productAttributes {
        attributeName
        attribute {
          attributeName
          values
        }
      }
      variant {
        attributes {
          attributeName
          value
        }
        currency
        stock
        refPrice
        adflyPrice
        imageURL
      }
      creationDate
      updateDate
      brand {
        name
      }
      productModel
      department {
        name
      }
      category {
        name
      }
      subCategory {
        name
      }
      tags
      specification
      condition
      conditionDetails
      productWarranty
      sellerWarranty
      included
      width
      height
      weight
      length
    }
  }
`;

export { GET_PRODUCTS };
