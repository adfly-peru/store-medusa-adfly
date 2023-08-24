import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query SingleProduct($id: ID!) {
    product(id: $id) {
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
        deliveryMethods {
          deliveryonline
          deliveryonhome
          deliveryonstore
        }
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
`;

const GET_PRODUCTS = gql`
  query FeaturedProducts($limit: Int, $offset: Int) {
    availableProducts(limit: $limit, offset: $offset) {
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

const GET_RELATED_PRODUCTS = gql`
  query RelatedProducts(
    $departmentName: String
    $categoryName: String
    $subcategoryName: String
    $brandName: String
    $excludedId: ID!
    $limit: Int
    $offset: Int
  ) {
    availableProducts(
      departmentName: $departmentName
      categoryName: $categoryName
      subcategoryName: $subcategoryName
      brandName: $brandName
      excludedId: $excludedId
      limit: $limit
      offset: $offset
    ) {
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

const GET_FILTERED_PRODUCTS = gql`
  query FilteredProducts(
    $sortBy: String
    $productSearch: String
    $departmentName: String
    $categoryName: String
    $subcategoryName: String
    $brandName: String
    $limit: Int
    $offset: Int
  ) {
    availableProducts(
      sortBy: $sortBy
      productSearch: $productSearch
      departmentName: $departmentName
      categoryName: $categoryName
      subcategoryName: $subcategoryName
      brandName: $brandName
      limit: $limit
      offset: $offset
    ) {
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

export {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  GET_RELATED_PRODUCTS,
};
