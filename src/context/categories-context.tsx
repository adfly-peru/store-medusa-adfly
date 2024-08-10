import {
  AvailablePromotionsQuery,
  BenefitCategoriesQuery,
  BrandsQuery,
  CampaignsQuery,
  CategoriesQuery,
  DepartmentsQuery,
  MarketplaceWorkplacesQuery,
  SubcategoriesQuery,
  useAvailablePromotionsQuery,
  useBenefitCategoriesQuery,
  useBrandsQuery,
  useCampaignsQuery,
  useCategoriesQuery,
  useDepartmentsQuery,
  useMarketplaceWorkplacesQuery,
  useSubcategoriesQuery,
} from "generated/graphql";
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

interface CategoriesContext {
  departments: DepartmentsQuery["departments"];
  categories: CategoriesQuery["categories"];
  subcategories: SubcategoriesQuery["subcategories"];
  brands: BrandsQuery["brands"];
  campaigns: CampaignsQuery["campaigns"];
  promotions: AvailablePromotionsQuery["availablePromotions"];
  benefitcategories: BenefitCategoriesQuery["benefitCategories"];
  marketplaceworkplaces: MarketplaceWorkplacesQuery["marketplaceWorkplaces"];
}

const CategoriesContext = createContext<CategoriesContext | null>(null);

interface CategoriesProviderProps {
  children?: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps) => {
  const { data: sessionData } = useSession();
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
  const { data: benefitCategories } = useBenefitCategoriesQuery({
    skip: !sessionData?.user?.uuidbusiness,
    variables: {
      id: sessionData?.user?.uuidbusiness ?? "",
    },
    defaultOptions: {
      fetchPolicy: "cache-first",
    },
  });
  const { data: marketplaceworkplaces } = useMarketplaceWorkplacesQuery({
    skip: !sessionData?.user?.uuidbusiness,
    variables: {
      id: sessionData?.user?.uuidbusiness ?? "",
    },
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
        benefitcategories: benefitCategories?.benefitCategories ?? [],
        marketplaceworkplaces:
          marketplaceworkplaces?.marketplaceWorkplaces ?? [],
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
