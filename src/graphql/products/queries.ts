import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query products {
    products {
      totalProducts
      products {
        uuidProduct
        productName
        brand {
          name
          id
        }
        productAttributes {
          attribute {
            attributeName
            values
          }
          attributeName
        }
        department {
          id
          name
        }
        category {
          uuidCategory
          name
        }
        subCategory {
          uuidSubCategory
          name
        }
        business {
          uuidbusiness
          businessname
        }
        productAttributes {
          attribute {
            attributeName
            values
          }
          attributeName
        }
        variant {
          uuidVariant
          currency
          refPrice
          adflyPrice
          offerPrice
          maxQuantity
          sku
          stock
          imageURL
          attributes {
            attributeName
            value
          }
        }
        description
        type
        productModel
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
        status
      }
    }
  }
`;

export { GET_PRODUCTS };
