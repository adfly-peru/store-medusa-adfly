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
      billingInfo {
        phone
        ruc
        businessname
        fiscaladdress
      }
      deliveryInfo {
        collaboratoraddress {
          uuidcollaboratoraddress
        }
        receivername
        receiverdocumentkind
        receiverdocumentnumber
      }
      suborders {
        uuidcartsuborder
        uuidcart
        uuidbusiness
        businessName
        deliverymethod
        deliveryprice
        availableDeliveryMethods {
          online
          onhome
          onstore
          deliveryOnHome {
            currency
            price
            timetodelivery
            comments
          }
          deliveryOnStore {
            department
          }
        }
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
