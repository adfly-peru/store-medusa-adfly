import { gql } from "@apollo/client";

const GET_ORDERS = gql`
  query getOrders(
    $limit: Int
    $offset: Int
    $sortBy: String
    $searchBy: String
    $asc: Boolean
    $collaboratorId: ID!
  ) {
    getOrders(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      searchBy: $searchBy
      asc: $asc
      uuidcollaborator: $collaboratorId
    ) {
      orders {
        uuidOrder
        creationDate
        updateDate
        status
        paymentInfo {
          purchaseNumber
        }
        businessName
        total
        igv
        finalTotal
        totalIgv
        deliveryPrice
      }
      totalOrders
    }
  }
`;

const GET_ORDER_REPORT = gql`
  query getOrderReport($uuidorder: ID!) {
    getOrderReport(uuidorder: $uuidorder) {
      order {
        comments
        isBilling
        isReceiver
        uuidOrder
        uuidCollaborator
        creationDate
        status
        total
        igv
        finalTotal
        totalIgv
        deliveryPrice
        businessName
        suborders {
          comments
          uuidBusiness
          businessName
          sellerName
          deliveryMethod
          deliveryPrice
          deliveryTime
          total
          status
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
        paymentInfo {
          canal
          card
          brand
          purchaseNumber
        }
      }
      billingInfo {
        phone
        ruc
        businessname
        fiscaladdress
      }
      deliveryInfo {
        receivername
        receiverdocumentkind
        receiverdocumentnumber
        collaboratoraddress {
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
      collaborator {
        name
        lastname
        documenttype
        documentnumber
        phonenumber
        email
      }
    }
  }
`;

export { GET_ORDERS, GET_ORDER_REPORT };
