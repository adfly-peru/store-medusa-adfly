import { useLazyQuery } from "@apollo/client";
import { GET_FILTERED_PRODUCTS } from "@graphql/products/queries";
import { Product, ProductResult } from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

export interface FilterOptions {
  sortBy?: string;
  productSearch?: string;
  departmentName?: string;
  categoryName?: string;
  subcategoryName?: string;
  brandName?: string;
  limit?: number;
  offset?: number;
}

interface FilteredProductsContext {
  products: ProductResult | null;
  count: number;
  fetchProducts: (options: FilterOptions) => void;
  loading: boolean;
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
  const [products, setProducts] = useState<ProductResult | null>(null);

  const [getProducts, { data: productsData, loading }] = useLazyQuery<{
    availableProducts: ProductResult;
  }>(GET_FILTERED_PRODUCTS);

  const fetchProducts = (options: FilterOptions) => {
    getProducts({
      variables: {
        ...options,
      },
    });
  };

  useEffect(() => {
    if (productsData && productsData.availableProducts) {
      setProducts(productsData.availableProducts);
      setCount(productsData.availableProducts.totalProducts);
    }
  }, [productsData]);

  return (
    <FilteredProductsContext.Provider
      value={{
        products,
        count,
        fetchProducts,
        loading,
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