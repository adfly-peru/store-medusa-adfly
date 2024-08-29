import {
  MarketplaceItemSortField,
  MarketplaceItemsQuery,
  SortDirection,
  useMarketplaceItemsLazyQuery,
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

interface IMarketplaceFiltersContext {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  result?: MarketplaceItemsQuery;
  selectedDepartments: UbigeoEntry[];
  setSelectedDepartments: Dispatch<SetStateAction<UbigeoEntry[]>>;
  condition: string;
  setCondition: Dispatch<SetStateAction<string>>;
  rangePrices: { from: number; to: number };
  setRangePrices: Dispatch<SetStateAction<{ from: number; to: number }>>;
  loading: boolean;
}

export const benefitSortItems = [
  { value: "name:asc", label: "A - Z" },
  { value: "name:desc", label: "Z - A" },
];

const MarketplaceFiltersContext =
  createContext<IMarketplaceFiltersContext | null>(null);

export const MarketplaceFiltersProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [rangePrices, setRangePrices] = useState({
    from: 0,
    to: 999999,
  });
  const { data: sessionData } = useSession();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<string>("name:asc");
  const [condition, setCondition] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<UbigeoEntry[]>(
    []
  );

  const [fetch, { data: result, loading }] = useMarketplaceItemsLazyQuery();

  useEffect(() => {
    if (!sessionData?.user?.uuidbusiness) return;
    if (!sessionData?.user?.id) return;
    fetch({
      variables: {
        id: sessionData.user.uuidbusiness,
        uuidcollaboratorignore: sessionData.user.id,
        page,
        limit: 12,
        filter: {
          price: rangePrices,
          status: condition ? condition : undefined,
          zones: selectedDepartments.map((d) => d.departamento),
        },
        sort:
          sort === "name:asc"
            ? {
                field: MarketplaceItemSortField.Title,
                direction: SortDirection.Asc,
              }
            : {
                field: MarketplaceItemSortField.Title,
                direction: SortDirection.Desc,
              },
      },
    });
  }, [
    selectedDepartments,
    page,
    sort,
    fetch,
    sessionData?.user?.id,
    sessionData?.user?.uuidbusiness,
    condition,
    rangePrices,
  ]);

  return (
    <MarketplaceFiltersContext.Provider
      value={{
        page,
        setPage,
        result,
        sort,
        setSort,
        selectedDepartments,
        setSelectedDepartments,
        rangePrices,
        setRangePrices,
        condition,
        setCondition,
        loading,
      }}
    >
      {children}
    </MarketplaceFiltersContext.Provider>
  );
};

export const useMarketplaceFilters = () => {
  const context = useContext(MarketplaceFiltersContext);

  if (context === null) {
    throw new Error(
      "useMarketplaceFilters must be used within an MarketplaceFiltersProvider"
    );
  }
  return context;
};
