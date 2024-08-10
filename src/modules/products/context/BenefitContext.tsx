import { useCategories } from "@context/categories-context";
import {
  BenefitCategory,
  BenefitSortField,
  BenefitSortInput,
  BenefitsQuery,
  SortDirection,
  useBenefitCategoriesQuery,
  useBenefitsLazyQuery,
  useBenefitsQuery,
} from "generated/graphql";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UbigeoEntry } from "ubigeo-peru";

interface IBenefitFiltersContext {
  categories: BenefitCategory[];
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
  selectedDepartments: UbigeoEntry[];
  setSelectedDepartments: Dispatch<SetStateAction<UbigeoEntry[]>>;
  result?: BenefitsQuery;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

export const benefitSortItems = [
  { value: "name:asc", label: "A - Z" },
  { value: "name:desc", label: "Z - A" },
];

const BenefitFiltersContext = createContext<IBenefitFiltersContext | null>(
  null
);

export const BenefitFiltersProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { data: sessionData } = useSession();
  const { benefitcategories: data } = useCategories();
  const [currentCategory, setCurrentCategory] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<UbigeoEntry[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("name:asc");

  const [fetch, { data: result }] = useBenefitsLazyQuery();

  useEffect(() => {
    if (!sessionData?.user?.uuidbusiness) return;
    fetch({
      variables: {
        id: sessionData.user.uuidbusiness,
        page,
        limit: 12,
        filter: {
          categoryName: currentCategory,
        },
        sort:
          sort === "name:asc"
            ? {
                field: BenefitSortField.Name,
                direction: SortDirection.Asc,
              }
            : {
                field: BenefitSortField.Name,
                direction: SortDirection.Desc,
              },
      },
    });
  }, [
    currentCategory,
    selectedDepartments,
    page,
    sort,
    fetch,
    sessionData?.user?.uuidbusiness,
  ]);

  return (
    <BenefitFiltersContext.Provider
      value={{
        categories: data,
        currentCategory,
        setCurrentCategory,
        selectedDepartments,
        setSelectedDepartments,
        page,
        setPage,
        result,
        sort,
        setSort,
      }}
    >
      {children}
    </BenefitFiltersContext.Provider>
  );
};

export const useBenefitFilters = () => {
  const context = useContext(BenefitFiltersContext);

  if (context === null) {
    throw new Error(
      "useBenefitFilters must be used within an BenefitFiltersProvider"
    );
  }
  return context;
};
