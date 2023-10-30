import { useLazyQuery } from "@apollo/client";
import { GET_FILTERED_PRODUCTS } from "@graphql/products/queries";
import { Offer, OfferResult } from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

export interface FilterOptions {
  sortBy?: string;
  productSearch?: string;
  departmentName?: string;
  categoryName?: string;
  subcategoryName?: string;
  brandName?: string;
}

interface FilteredProductsContext {
  products: OfferResult | null;
  count: number;
  fetchProducts: (options: FilterOptions) => void;
  loading: boolean;
  limit: number;
  setlimit: (v: number) => void;
  offset: number;
  setoffset: (v: number) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

const FilteredProductsContext = createContext<FilteredProductsContext | null>(
  null
);

interface FilteredProductsProviderProps {
  children?: React.ReactNode;
}

export const FilteredProductsProvider = ({
  children,
}: FilteredProductsProviderProps) => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<OfferResult | null>(null);
  const [sortBy, setSortBy] = useState("name");
  const [limit, setlimit] = useState(12);
  const [offset, setoffset] = useState(0);

  const [getProducts, { data: productsData, loading }] = useLazyQuery<{
    availableOffers: OfferResult;
  }>(GET_FILTERED_PRODUCTS);

  const fetchProducts = (options: FilterOptions) => {
    getProducts({
      variables: {
        ...options,
        limit,
        offset,
        sortBy,
      },
    });
  };

  useEffect(() => {
    if (productsData && productsData.availableOffers) {
      setProducts(productsData.availableOffers);
      setCount(productsData.availableOffers.totalOffers);
    }
  }, [productsData]);

  return (
    <FilteredProductsContext.Provider
      value={{
        products,
        count,
        fetchProducts,
        loading,
        limit,
        setlimit,
        offset,
        setoffset,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </FilteredProductsContext.Provider>
  );
};

export const useFilteredProducts = () => {
  const context = useContext(FilteredProductsContext);

  if (context === null) {
    throw new Error(
      "useFilteredProducts must be used within a FilteredProductsProvider"
    );
  }
  return context;
};
