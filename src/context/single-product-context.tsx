import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT, GET_RELATED_PRODUCTS } from "@graphql/products/queries";
import { Offer, OfferResult } from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

interface SingleProductContext {
  product: Offer | null;
  relatedProducts: Offer[];
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
  const [product, setProduct] = useState<Offer | null>(null);
  const [relatedCount, setRelatedCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Offer[]>([]);

  const [getProduct, { data: productData, loading: loadingProduct }] =
    useLazyQuery<{
      offer: Offer;
    }>(GET_PRODUCT);
  const [
    getRelatedProducts,
    { data: relatedProductsData, loading: loadingRelateds },
  ] = useLazyQuery<{
    availableOffers: OfferResult;
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
    if (productData && productData.offer) {
      setProduct(productData.offer);
    }

    if (relatedProductsData && relatedProductsData.availableOffers) {
      setRelatedProducts(relatedProductsData.availableOffers.offers);
      setRelatedCount(relatedProductsData.availableOffers.totalOffers);
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
