import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT, GET_RELATED_PRODUCTS } from "@graphql/products/queries";
import { Product, ProductResult } from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

interface SingleProductContext {
  product: Product | null;
  relatedProducts: Product[];
  relatedCount: number;
  fetchProduct: (id: string) => void;
  fetchRelatedProducts: (id: string, offset?: number) => void;
  loadingProduct: boolean;
  loadingRelateds: boolean;
}

const SingleProductContext = createContext<SingleProductContext | null>(null);

interface SingleProductProviderProps {
  children?: React.ReactNode;
}

export const SingleProductProvider = ({
  children,
}: SingleProductProviderProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedCount, setRelatedCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [getProduct, { data: productData, loading: loadingProduct }] =
    useLazyQuery<{
      product: Product;
    }>(GET_PRODUCT);
  const [
    getRelatedProducts,
    { data: relatedProductsData, loading: loadingRelateds },
  ] = useLazyQuery<{
    availableProducts: ProductResult;
  }>(GET_RELATED_PRODUCTS);

  const fetchProduct = (id: string) => {
    getProduct({ variables: { id } });
  };

  const fetchRelatedProducts = (id: string, offset: number = 0) => {
    getRelatedProducts({
      variables: {
        departmentName: product?.department.name,
        excludedId: id,
        limit: 4,
        offset,
      },
    });
  };

  useEffect(() => {
    if (productData && productData.product) {
      setProduct(productData.product);
    }

    if (relatedProductsData && relatedProductsData.availableProducts) {
      setRelatedProducts(relatedProductsData.availableProducts.products);
      setRelatedCount(relatedProductsData.availableProducts.totalProducts);
    }
  }, [productData, relatedProductsData]);

  return (
    <SingleProductContext.Provider
      value={{
        product,
        relatedProducts,
        relatedCount,
        fetchProduct,
        fetchRelatedProducts,
        loadingProduct,
        loadingRelateds,
      }}
    >
      {children}
    </SingleProductContext.Provider>
  );
};

export const useSingleProduct = () => {
  const context = useContext(SingleProductContext);

  if (context === null) {
    throw new Error(
      "useSingleProduct must be used within a SingleProductProvider"
    );
  }
  return context;
};
