import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@graphql/products/queries";
import { Product, ProductResult } from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

interface FeaturedProductsContext {
  products: Product[];
  count: number;
  fetchProducts: (offset?: number) => void;
  loading: boolean;
}

const FeaturedProductsContext = createContext<FeaturedProductsContext | null>(
  null
);

interface FeaturedProductsProviderProps {
  children?: React.ReactNode;
}

export const FeaturedProductsProvider = ({
  children,
}: FeaturedProductsProviderProps) => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const [getProducts, { data: productsData, loading }] = useLazyQuery<{
    availableProducts: ProductResult;
  }>(GET_PRODUCTS);

  const fetchProducts = (offset: number = 0) => {
    getProducts({ variables: { limit: 10, offset } });
  };

  useEffect(() => {
    if (productsData && productsData.availableProducts) {
      setProducts(productsData.availableProducts.products);
      setCount(productsData.availableProducts.totalProducts);
    }
  }, [productsData]);

  return (
    <FeaturedProductsContext.Provider
      value={{
        products,
        count,
        fetchProducts,
        loading,
      }}
    >
      {children}
    </FeaturedProductsContext.Provider>
  );
};

export const useFeaturedProducts = () => {
  const context = useContext(FeaturedProductsContext);

  if (context === null) {
    throw new Error(
      "useFeaturedProducts must be used within a FeaturedProductsProvider"
    );
  }
  return context;
};
