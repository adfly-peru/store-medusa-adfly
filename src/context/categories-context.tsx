import {
  AvailablePromotionsQuery,
  BrandsQuery,
  CampaignsQuery,
  CategoriesQuery,
  DepartmentsQuery,
  SubcategoriesQuery,
  useAvailablePromotionsQuery,
  useBrandsQuery,
  useCampaignsQuery,
  useCategoriesQuery,
  useDepartmentsQuery,
  useSubcategoriesQuery,
} from "generated/graphql";
import { createContext, useContext } from "react";

interface CategoriesContext {
  departments: DepartmentsQuery["departments"];
  categories: CategoriesQuery["categories"];
  subcategories: SubcategoriesQuery["subcategories"];
  brands: BrandsQuery["brands"];
  campaigns: CampaignsQuery["campaigns"];
  promotions: AvailablePromotionsQuery["availablePromotions"];
}

const CategoriesContext = createContext<CategoriesContext | null>(null);

interface CategoriesProviderProps {
  children?: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const { data: departmentsResult } = useDepartmentsQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: categoriesResult } = useCategoriesQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: subcategoriesResult } = useSubcategoriesQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: brandsResult } = useBrandsQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: campaignsResult } = useCampaignsQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: promotionsResult } = useAvailablePromotionsQuery({
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });

  return (
    <CategoriesContext.Provider
      value={{
        departments: departmentsResult?.departments ?? [],
        categories: categoriesResult?.categories ?? [],
        subcategories: subcategoriesResult?.subcategories ?? [],
        brands: brandsResult?.brands ?? [],
        campaigns: campaignsResult?.campaigns ?? [],
        promotions: promotionsResult?.availablePromotions ?? [],
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (context === null) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
