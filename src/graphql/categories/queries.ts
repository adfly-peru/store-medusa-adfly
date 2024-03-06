import { gql } from "@apollo/client";

const GET_DEPARTMENTS = gql`
  query getDepartments {
    departments {
      id
      name
      description
      active
      visible
      outstanding
      image
      # categories {
      #   uuidCategory
      #   name
      #   description
      #   active
      #   visible
      # }
    }
  }
`;

const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      uuidCategory
      uuidDepartment
      name
      description
      active
      visible
      subCategories {
        uuidSubCategory
        name
        description
        active
        visible
      }
    }
  }
`;

const GET_SUBCATEGORIES = gql`
  query getSubcategories {
    subcategories {
      uuidSubCategory
      uuidCategory
      name
      description
      active
      visible
    }
  }
`;

const GET_BRANDS = gql`
  query getBrands {
    brands {
      id
      name
    }
  }
`;

const GET_CAMPAIGNS = gql`
  query getCampaigns {
    getAllCampaigns(limit: 20, offset: 0, sortBy: "name", onlyAccepted: true) {
      campaigns {
        uuidcampaign
        name
        description
      }
    }
  }
`;

export {
  GET_CATEGORIES,
  GET_DEPARTMENTS,
  GET_SUBCATEGORIES,
  GET_BRANDS,
  GET_CAMPAIGNS,
};
