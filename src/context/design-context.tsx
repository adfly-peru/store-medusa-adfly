import { ApolloError } from "@apollo/client";
import Loader from "@modules/components/LoadingScreen/Loader";
import { Theme, ThemeProvider, createTheme } from "@mui/material";
import baseTheme from "@styles/theme";
import { StoreDesignQuery, useStoreDesignQuery } from "generated/graphql";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface DesignContextProps {
  storeDesign?: StoreDesignQuery["storeDesign"];
  theme?: Theme;
  loading: boolean;
  error?: ApolloError;
}

const DesignContext = createContext<DesignContextProps | null>(null);

interface DesignProviderProps {
  children?: React.ReactNode;
}

export const DesignProvider = ({ children }: DesignProviderProps) => {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const { data, loading, error } = useStoreDesignQuery({
    variables: { subdomain: subdomain ?? "" },
    skip: !subdomain,
  });

  useEffect(() => {
    const obtenerSubDominio = () => {
      const { hostname } = window.location;
      const partes = hostname.split(".");
      if (partes.length > 2) {
        setSubdomain(partes[0]);
      } else {
        setSubdomain("tiendajuandev");
      }
    };
    obtenerSubDominio();
  }, []);

  const theme = useMemo(() => {
    if (data?.storeDesign) {
      const newTheme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 375,
            msm: 949,
            md: 834,
            lg: 1440,
            xl: 1536,
          } as any,
        },
        palette: {
          primary: {
            main: data.storeDesign.backcolor || "#31658E",
            contrastText: data.storeDesign.fontcolor || "#ffffff",
          },
          secondary: {
            main: data.storeDesign.fontcolor || "#ffffff",
            contrastText: data.storeDesign.backcolor || "#31658E",
          },
          grey: {
            200: "#C7CACD",
            300: "#8F959B",
            400: "#8F959B",
            500: "#737A82",
            600: "#5C6268",
            700: "#45494E",
            800: "#2E3134",
            900: "#242529",
          },
        },
      });

      return createTheme(newTheme, baseTheme(newTheme));
    }
    return;
  }, [data]);

  return (
    <DesignContext.Provider
      value={{ storeDesign: data?.storeDesign, theme, loading, error }}
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

export const DesignContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { theme, error, loading } = useDesign();

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;
  if (!theme) return <Loader />;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
