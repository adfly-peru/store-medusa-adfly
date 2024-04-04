import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Campaign, Department } from "@interfaces/category";
import {
  GET_CAMPAIGNS,
  GET_DEPARTMENTS,
  GET_PROMOTIONS,
} from "@graphql/categories/queries";
import { Promotion } from "@interfaces/promotion";
import { IToken } from "@interfaces/collaborator";
import jwtDecode from "jwt-decode";

interface ProductContext {
  departments: Department[];
  campaigns: Campaign[];
  promotions: Promotion[];
}

const ProductContext = createContext<ProductContext | null>(null);

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [businessid, setBusinessid] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const { data: departments } = useQuery<{ departments: Department[] }>(
    GET_DEPARTMENTS
  );
  const { data: campaigns } = useQuery<{
    getAllCampaigns: { campaigns: Campaign[] };
  }>(GET_CAMPAIGNS);
  const { data: promotions } = useQuery<{
    availablePromotions: Promotion[];
  }>(GET_PROMOTIONS, {
    variables: { userid, businessid },
    skip: !userid || !businessid,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("collaboratortoken");
      if (!token) return;
      const decodedToken: IToken = jwtDecode(token);
      setUserid(decodedToken.uuid_collaborator);
      setBusinessid(decodedToken.uuid_business);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        departments: departments?.departments ?? [],
        campaigns: campaigns?.getAllCampaigns?.campaigns ?? [],
        promotions: promotions?.availablePromotions ?? [],
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (context === null) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
