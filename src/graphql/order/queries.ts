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
          deliveryAddress {
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
          total
          status
          items {
            uuidorderitem
            uuidsuborder
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
              variantSku
              offer {
                offerName
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
        receiverphone
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

const GET_COUPONS = gql`
  query getCoupons(
    $limit: Int
    $offset: Int
    $sortBy: String
    $searchBy: String
    $asc: Boolean
    $collaboratorId: ID!
  ) {
    getCoupons(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      searchBy: $searchBy
      asc: $asc
      uuidcollaborator: $collaboratorId
    ) {
      coupons {
        uuidcouponcollaboratorusage
        uuidcollaborator
        uuidproduct
        uuidvariant
        businessname
        dateused
        type
        couponcode
      }
      totalCoupons
    }
  }
`;

const GET_COUPON_REPORT = gql`
  query couponReport($uuidcouponcollaboratorusage: ID!) {
    couponReport(uuidcouponcollaboratorusage: $uuidcouponcollaboratorusage) {
      uuidcouponcollaboratorusage
      uuidcollaborator
      uuidproduct
      uuidvariant
      businessname
      dateused
      type
      couponcode
      couponData {
        initialDate
        expirationDate
        initialPurchaseDate
        expirationPurchaseDate
        couponUsage
        couponContent
        discountType
        discount
        couponCode
      }
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
        variantSku
        offer {
          offerName
          description
          type
        }
      }
    }
  }
`;

export { GET_ORDERS, GET_ORDER_REPORT, GET_COUPONS, GET_COUPON_REPORT };
