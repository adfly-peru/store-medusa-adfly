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
