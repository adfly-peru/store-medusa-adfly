import { useQuery } from "@apollo/client";
import { GET_LOGIN__DESIGN } from "@graphql/design/queries";
import { DesignConfig } from "@interfaces/design";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DesignContext {
  loginDesign: DesignConfig | null;
  error: string | null;
}

const DesignContext = createContext<DesignContext | null>(null);

interface DesignProviderProps {
  children?: React.ReactNode;
}

export const DesignProvider = ({ children }: DesignProviderProps) => {
  const [error, setError] = useState<string | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [loginDesign, setLoginDesign] = useState<DesignConfig | null>(null);
  const {
    data,
    error: errorQuery,
    loading,
    refetch,
  } = useQuery<{
    loginDesign: DesignConfig;
  }>(GET_LOGIN__DESIGN, { variables: { subdomain }, skip: !subdomain });

  const fetchLoginDesign = async () => {
    if (data) {
      setLoginDesign(data.loginDesign);
    } else {
      setError("No se pudo obtener el diseño de login");
    }
  };

  useEffect(() => {
    fetchLoginDesign();
  }, [data]);

  useEffect(() => {
    if (errorQuery) {
      setError("Error al obtener el diseño: " + error);
    }
  }, [errorQuery]);

  useEffect(() => {
    const obtenerSubDominio = () => {
      const { hostname } = window.location;
      const partes = hostname.split(".");
      if (partes.length > 2) {
        setSubdomain(partes[0]);
      } else {
        setError("No se encuentra un subdominio en la URL");
      }
    };
    obtenerSubDominio();
  }, []);

  return (
    <DesignContext.Provider
      value={{
        loginDesign,
        error,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);

  if (context === null) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
};
