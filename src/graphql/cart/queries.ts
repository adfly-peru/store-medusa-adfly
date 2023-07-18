import { gql } from "@apollo/client";

const GET_CART = gql`
  query getCart($collaboratorId: ID!) {
    getCart(uuidcollaborator: $collaboratorId) {
      uuidcart
      uuidcollaborator
      creationdate
      updatedate
      status
      expirationdate
      total
      suborders {
        uuidcartsuborder
        uuidcart
        uuidbusiness
        businessName
        deliverymethod
        items {
          uuidcartitem
          uuidcartsuborder
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
      purchaseNumber
    }
  }
`;

export { GET_CART };
