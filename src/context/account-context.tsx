import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_COLLABORATOR } from "@graphql/collaborator/queries";
import {
  Collaborator,
  IToken,
  ProfileForm,
  SecurityForm,
} from "@interfaces/collaborator";
import jwtDecode from "jwt-decode";
import Address from "@interfaces/address-interface";
import { DesignConfig } from "@interfaces/design";
import { GET_HOME_DESIGN } from "@graphql/design/queries";
import { verifyAccount } from "api/verify";

interface AccountContext {
  login: (values: { email: string; password: string }) => void;
  logout: () => void;
  verify: (
    profileForm?: ProfileForm,
    securityForm?: SecurityForm
  ) => Promise<string | null>;
  collaborator: Collaborator | undefined;
  homeDesign: DesignConfig | null;
  status: string;
  addresses: Address[];
  editAddresses: (newAddresses: Address[]) => void;
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<Collaborator | undefined>(
    undefined
  );
  const [homeDesign, setHomeDesign] = useState<DesignConfig | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("initial");
  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { data, refetch, error } = useQuery<{
    collaborator: Collaborator;
  }>(GET_COLLABORATOR, {
    variables: { uuidcollaborator: userId },
    skip: !userId,
  });
  const { data: dataDesign, refetch: refetchDesign } = useQuery<{
    homeDesign: DesignConfig;
  }>(GET_HOME_DESIGN, {
    variables: { uuidcollaborator: userId },
    skip: !userId,
  });

  const fetchCollaborator = async () => {
    if (data) {
      setCollaborator(data.collaborator);
    }
  };
  const fetchHomeDesign = async () => {
    if (dataDesign) {
      setHomeDesign(dataDesign.homeDesign);
    }
  };

  useEffect(() => {
    fetchCollaborator();
  }, [data]);
  useEffect(() => {
    fetchHomeDesign();
  }, [dataDesign]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  }, [error]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("collaboratortoken");
        if (storedToken) {
          setStatus("authenticated");
          setToken(storedToken);
          const decodedToken: IToken = jwtDecode(storedToken);
          const decodeduserid = decodedToken.uuid_collaborator;
          setUserId(decodeduserid);
        } else {
          setStatus("unauthenticated");
        }
      }
    } catch (error) {
      console.error(error);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    const obtenerSubDominio = () => {
      const { hostname } = window.location;
      const partes = hostname.split(".");
      if (partes.length > 2) {
        setSubdomain(partes[0]);
      }
    };
    obtenerSubDominio();
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken: IToken = jwtDecode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      const timeoutId = setTimeout(() => {
        logout();
      }, expirationDate.getTime() - new Date().getTime());

      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  const editAddresses = (newAddress: Address[]) => {
    setAddresses(newAddress);
  };

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/auth/signin`,
        {
          credential: values.email,
          password: values.password,
          sub_domain: subdomain,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = response.data;
      const authToken = data["data"].token;
      if (typeof window !== "undefined") {
        localStorage.setItem("collaboratortoken", authToken);
        const decodedToken: IToken = jwtDecode(authToken);
        const decodeduserid = decodedToken.uuid_collaborator;
        setUserId(decodeduserid);
      }
      setToken(authToken);
      setStatus("authenticated");
      router.push("/");
      refetch();
      refetchDesign();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("collaboratortoken");
    }
    setUserId(null);
    setToken(null);
    setStatus("unauthenticated");
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (!(config.method === "put")) {
        if (token) {
          config.headers["Authorization"] = token;
        }
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          logout();
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout]);

  const verify = async (
    profileForm?: ProfileForm,
    securityForm?: SecurityForm
  ) => {
    const response = await verifyAccount(profileForm, securityForm);
    if (response == null) {
      refetch();
    }
    return response;
  };

  return (
    <AccountContext.Provider
      value={{
        collaborator,
        verify,
        homeDesign,
        login,
        logout,
        status,
        addresses,
        editAddresses,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};