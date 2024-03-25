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
        uuidbillinginfo
        phone
        ruc
        businessname
        fiscaladdress
      }
      deliveryInfo {
        uuiddeliveryinfo
        collaboratoraddress {
          uuidcollaboratoraddress
        }
        receivername
        receiverphone
        receiverdocumentkind
        receiverdocumentnumber
      }
      suborders {
        uuidcartsuborder
        uuidcart
        uuidbusiness
        uuidaddress
        businessName
        deliverymethod
        deliveryprice
        deliverytime
        type
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
            uuiddeliverystore
            name
            country
            department
            city
            district
            line
            timetodelivery
            comments
          }
        }
        items {
          uuidcartitem
          uuidcartsuborder
          uuidvariant
          uuidoffer
          attributes {
            attributeName
            value
          }
          variant {
            uuidVariant
            attributes {
              attributeName
              value
            }
            currency
            stock
            totalStock
            refPrice
            adflyPrice
            offerPrice
            maxQuantity
            purchasePeriod
            imageURL
            variantSku
            totalLastPeriod
            offer {
              uuidOffer
              offerName
              description
              type
              termConditions
              uuiddepartment
              uuidcampaign
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
