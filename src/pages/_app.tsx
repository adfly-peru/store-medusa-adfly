import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider, useAccount } from "@context/account-context";
import { ProductProvider } from "@context/product-context";
import { CartProvider } from "@context/cart-context";
import client from "lib/apollo-config";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
  rem,
} from "@mantine/core";
import { OrderProvider } from "@context/order-context";
import { DesignProvider } from "@context/design-context";
import RegistrationStepsModal from "@modules/layout/templates/registration-steps-modal";
import { LoadScript } from "@react-google-maps/api";
import "@fontsource/rubik";

const adflyColors = {
  default: "#31658E",
  pressed: "#3D7FB2",
  hover: "#234966",
  disabled: "#A8C8E1",
};

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{}>) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useEffect(() => {
    if (window.google) {
      setIsScriptLoaded(true);
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            components: {
              Button: {
                styles: (theme, params: ButtonStylesParams, { variant }) => ({
                  root: {
                    borderRadius: rem(8),
                    backgroundColor:
                      variant === "filled" ? adflyColors.default : undefined,
                    "&:hover": {
                      backgroundColor:
                        variant === "filled" ? adflyColors.hover : undefined,
                    },
                    "&:active": {
                      backgroundColor:
                        variant === "filled" ? adflyColors.pressed : undefined,
                    },
                    "&:disabled": {
                      backgroundColor: adflyColors.disabled,
                    },
                  },
                }),
              },
              Input: {
                styles: (theme) => ({
                  input: {
                    borderColor: "#737A82",
                    color: "#737A82",
                    borderRadius: rem(8),
                  },
                }),
              },
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <DesignProvider>
            <AccountProvider>
              <ResourcesProvider>
                {isScriptLoaded ? (
                  <Component {...pageProps} />
                ) : (
                  <LoadScript
                    googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                    libraries={["places"]}
                    onLoad={() => setIsScriptLoaded(true)}
                  >
                    <Component {...pageProps} />
                  </LoadScript>
                )}
              </ResourcesProvider>
            </AccountProvider>
          </DesignProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
}

const ResourcesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { status, collaborator } = useAccount();

  if (status == "authenticated") {
    if (!collaborator) {
      return <LoadingOverlay visible={true} />;
    }
    if (collaborator.emailVerify && collaborator.changePassword) {
      return (
        <ProductProvider>
          <CartProvider>
            <OrderProvider>{children}</OrderProvider>
          </CartProvider>
        </ProductProvider>
      );
    }
    return <RegistrationStepsModal>{children}</RegistrationStepsModal>;
  }

  return <>{children}</>;
};
