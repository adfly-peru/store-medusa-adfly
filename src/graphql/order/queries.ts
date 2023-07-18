import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders($collaboratorId: ID!) {
    getOrders(uuidcollaborator: $collaboratorId) {
      uuidorder
      uuidcollaborator
      creationdate
      status
      total
      igv
      finaltotal
      purchasenumber
      installment
      suborders {
        uuidbusiness
        businessName
        deliverymethod
        status
        total
        items {
          uuidvariant
          variant {
            uuidVariant
            attributes {
              attributeName
              value
            }
            currency
            stock
            refPrice
            adflyPrice
            offerPrice
            maxQuantity
            imageURL
            sku
            product {
              productName
              description
              type
            }
          }
          quantity
          subtotal
        }
      }
    }
  }
`;

export { GET_ORDERS };
