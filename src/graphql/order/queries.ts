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
        details {
          collaborator {
            name
            lastname
            documenttype
            documentnumber
            email
            phonenumber
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
            phone
          }
          isreceiver
          isbilling
        }
        suborders {
          comments
          uuidBusiness
          businessName
          sellerName
          deliveryMethod
          deliveryPrice
          deliveryTime
          details {
            name
            country
            department
            province
            district
            address
            comments
          }
          total
          status
          items {
            uuidorderitem
            uuidsuborder
            uuidvariant
            quantity
            subtotal
            details {
              type
              description
              refprice
              adflyprice
              offerprice
              imageurl
              variantsku
              productname
              termsconditions
              principalsku
              attributes {
                attributeName
                value
              }
              uuidbrand
              uuiddepartment
              uuidcategory
              uuidsubcategory
              uuidbusiness
              initialdate
              expirationdate
              initialpurchasedate
              expirationpurchasedate
              accessservice
              contentservice
              servicesCodes
              specification
              condition
              conditiondetails
              productwarranty
              sellerwarranty
              included
              width
              height
              weight
              length
            }
          }
        }
        paymentInfo {
          canal
          card
          brand
          purchaseNumber
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
