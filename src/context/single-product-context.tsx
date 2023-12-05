import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT, GET_RELATED_PRODUCTS } from "@graphql/products/queries";
import {
  Offer,
  OfferForCollaborator,
  OfferResult,
} from "@interfaces/productInterface";
import { createContext, useContext, useEffect, useState } from "react";

interface SingleProductContext {
  product: OfferForCollaborator | null;
  relatedProducts: Offer[];
  relatedCount: number;
  fetchProduct: (id: string, collaboratorId: string) => void;
  refetchProduct: (id: string, collaboratorId: string) => void;
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
  const [product, setProduct] = useState<OfferForCollaborator | null>(null);
  const [relatedCount, setRelatedCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Offer[]>([]);

  const [getProduct, { data: productData, loading: loadingProduct, refetch }] =
    useLazyQuery<{
      offerForCollaborator: OfferForCollaborator;
    }>(GET_PRODUCT);
  const [
    getRelatedProducts,
    { data: relatedProductsData, loading: loadingRelateds },
  ] = useLazyQuery<{
    availableOffers: OfferResult;
  }>(GET_RELATED_PRODUCTS);

  const fetchProduct = (id: string, collaboratorId: string) => {
    getProduct({ variables: { id, collaboratorId } });
  };

  const refetchProduct = (id: string, collaboratorId: string) => {
    refetch({ variables: { id, collaboratorId } });
  };

  const fetchRelatedProducts = (id: string, offset: number = 0) => {
    getRelatedProducts({
      variables: {
        departmentName: product?.offer?.department?.name,
        excludedId: id,
        limit: 4,
        offset,
      },
    });
  };

  useEffect(() => {
    if (productData && productData.offerForCollaborator) {
      setProduct(productData.offerForCollaborator);
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
        refetchProduct,
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
