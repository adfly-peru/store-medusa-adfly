import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query SingleOffer($id: ID!) {
    offer(id: $id) {
      uuidOffer
      offerName
      description
      principalSku
      type
      creationDate
      updateDate
      tags
      rejectionComment
      status
      termConditions
      brand {
        name
      }
      offerAttributes {
        attribute {
          attributeName
          values
        }
        attributeName
      }
      department {
        name
      }
      category {
        name
      }
      subCategory {
        name
      }
      business {
        uuidbusiness
        businessname
        commercialname
        deliveryMethods {
          deliveryonline
          deliveryonhome
          deliveryonstore
        }
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
        purchasePeriod
        imageURL
        variantSku
        product {
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
        coupon {
          initialDate
          expirationDate
          initialPurchaseDate
          expirationPurchaseDate
          couponUsage
          couponContent
          discountType
          discount
        }
        service {
          initialDate
          expirationDate
          initialPurchaseDate
          expirationPurchaseDate
          accessService
          contentService
        }
      }
    }
  }
`;

const GET_PRODUCTS = gql`
  query FeaturedOffers($limit: Int, $offset: Int) {
    availableOffers(limit: $limit, offset: $offset) {
      totalOffers
      offers {
        uuidOffer
        offerName
        description
        principalSku
        type
        creationDate
        updateDate
        tags
        rejectionComment
        status
        brand {
          name
        }
        offerAttributes {
          attribute {
            attributeName
            values
          }
          attributeName
        }
        department {
          name
        }
        category {
          name
        }
        subCategory {
          name
        }
        business {
          uuidbusiness
          businessname
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
          purchasePeriod
          imageURL
          variantSku
          product {
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
          coupon {
            initialDate
            expirationDate
            initialPurchaseDate
            expirationPurchaseDate
            couponUsage
            couponContent
            discountType
            discount
          }
          service {
            initialDate
            expirationDate
            initialPurchaseDate
            expirationPurchaseDate
            accessService
            contentService
          }
        }
      }
    }
  }
`;

const GET_RELATED_PRODUCTS = gql`
  query RelatedOffers(
    $departmentName: String
    $categoryName: String
    $subcategoryName: String
    $brandName: String
    $excludedId: ID!
    $limit: Int
    $offset: Int
  ) {
    availableOffers(
      departmentName: $departmentName
      categoryName: $categoryName
      subcategoryName: $subcategoryName
      brandName: $brandName
      excludedId: $excludedId
      limit: $limit
      offset: $offset
    ) {
      totalOffers
      offers {
        uuidOffer
        offerName
        description
        principalSku
        type
        creationDate
        updateDate
        tags
        rejectionComment
        status
        brand {
          name
        }
        offerAttributes {
          attribute {
            attributeName
            values
          }
          attributeName
        }
        department {
          name
        }
        category {
          name
        }
        subCategory {
          name
        }
        business {
          uuidbusiness
          businessname
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
          purchasePeriod
          imageURL
          variantSku
          product {
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
          coupon {
            initialDate
            expirationDate
            initialPurchaseDate
            expirationPurchaseDate
            couponUsage
            couponContent
            discountType
            discount
          }
          service {
            initialDate
            expirationDate
            initialPurchaseDate
            expirationPurchaseDate
            accessService
            contentService
          }
        }
      }
    }
  }
`;

const GET_FILTERED_PRODUCTS = gql`
  query FilteredProducts(
    $sortBy: String
    $offerSearch: String
    $departmentName: String
    $categoryName: String
    $subcategoryName: String
    $brandName: String
    $limit: Int
    $offset: Int
  ) {
    availableOffers(
      sortBy: $sortBy
      offerSearch: $offerSearch
      departmentName: $departmentName
      categoryName: $categoryName
      subcategoryName: $subcategoryName
      brandName: $brandName
      limit: $limit
      offset: $offset
    ) {
      departmentCounts {
        uuid
        name
        count
      }
      brandCounts {
        uuid
        name
        count
      }
      categoryCounts {
        uuid
        name
        count
      }
      subcategoryCounts {
        uuid
        name
        count
      }
      totalOffers
      offers {
        uuidOffer
        offerName
        description
        principalSku
        type
        creationDate
        updateDate
        tags
        rejectionComment
        status
        brand {
          name
        }
        offerAttributes {
          attribute {
            attributeName
            values
          }
          attributeName
        }
        department {
          name
        }
        category {
          name
        }
        subCategory {
          name
        }
        business {
          uuidbusiness
          businessname
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
          purchasePeriod
          imageURL
          variantSku
          coupon {
            initialDate
            expirationDate
            initialPurchaseDate
            expirationPurchaseDate
            couponUsage
            couponContent
            discountType
            discount
          }
        }
      }
    }
  }
`;

export {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GET_RELATED_PRODUCTS,
};
