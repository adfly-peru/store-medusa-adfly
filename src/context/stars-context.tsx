import { useLazyQuery } from "@apollo/client";
import { GET_COUPONS, GET_COUPON_REPORT } from "@graphql/order/queries";
import { createContext, useState, useContext, useEffect } from "react";
import { useAccount } from "./account-context";
import { PaginatedCollaboratorStars } from "@interfaces/star";
import { GET_STARS } from "@graphql/star/queries";

interface FilterOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  asc?: boolean;
}

interface StarContext {
  paginatedStars: PaginatedCollaboratorStars | null;
  loading: boolean;
  setOptions: (options: FilterOptions) => void;
}

const StarContext = createContext<StarContext | null>(null);

export const StarProvider = ({ children }: { children?: React.ReactNode }) => {
  const { collaborator } = useAccount();
  const [options, setOptions] = useState<FilterOptions>({});
  const [paginatedStars, setPaginatedStars] =
    useState<PaginatedCollaboratorStars | null>(null);
  const [getStars, { data, error, loading }] = useLazyQuery<{
    collaboratorStars: PaginatedCollaboratorStars;
  }>(GET_STARS);

  useEffect(() => {
    if (collaborator?.uuidcollaborator)
      getStars({
        variables: {
          userId: collaborator.uuidcollaborator,
          ...options,
        },
      });
  }, [options, collaborator]);

  useEffect(() => {
    if (data && data.collaboratorStars) {
      setPaginatedStars(data.collaboratorStars);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener estrellas:", error);
    }
  }, [error]);

  return (
    <StarContext.Provider value={{ paginatedStars, setOptions, loading }}>
      {children}
    </StarContext.Provider>
  );
};

export const useStar = () => {
  const context = useContext(StarContext);

  if (context === null) {
    throw new Error("useStar must be used within an StarProvider");
  }
  return context;
};
