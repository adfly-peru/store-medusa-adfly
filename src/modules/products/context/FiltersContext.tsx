import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IFiltersContext {
  brands: string[];
  setBrands: (v: string[]) => void;
  campaigns: string[];
  setCampaigns: (v: string[]) => void;
  partners: string[];
  setPartners: (v: string[]) => void;
  filters: {
    [x: string]: string[];
  };
  setFilters: Dispatch<
    SetStateAction<{
      [x: string]: string[];
    }>
  >;
  pricesRange:
    | {
        min: number;
        max: number;
      }
    | undefined;
  setPricesRange: Dispatch<
    SetStateAction<
      | {
          min: number;
          max: number;
        }
      | undefined
    >
  >;
  handleApplyFilters: () => void;
}

const FiltersContext = createContext<IFiltersContext | null>(null);

export const FiltersProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const router = useRouter();
  const [brands, setBrands] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<string[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [filters, setFilters] = useState<{
    [x: string]: string[];
  }>({
    brand_name: [],
    campaign_names: [],
    commercial_name: [],
  });
  const [pricesRange, setPricesRange] = useState<{
    min: number;
    max: number;
  }>();

  const handleApplyFilters = () => {
    const newQuery = { ...router.query };
    newQuery["brand_name"] = filters["brand_name"];
    newQuery["campaign_names"] = filters["campaign_names"];
    newQuery["commercial_name"] = filters["commercial_name"];
    if (pricesRange) {
      newQuery["minPrice"] = pricesRange.min.toString();
      newQuery["maxPrice"] = pricesRange.max.toString();
    }
    router.push(
      {
        pathname: "/search",
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
    setFilters({
      brand_name: [],
      campaign_names: [],
      commercial_name: [],
    });
  };

  return (
    <FiltersContext.Provider
      value={{
        brands,
        setBrands,
        campaigns,
        setCampaigns,
        partners,
        setPartners,
        filters,
        setFilters,
        pricesRange,
        setPricesRange,
        handleApplyFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (context === null) {
    throw new Error("useFilters must be used within an FiltersProvider");
  }
  return context;
};
