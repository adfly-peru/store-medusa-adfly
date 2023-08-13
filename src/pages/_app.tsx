import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider, useAccount } from "@context/account-context";
import { ProductProvider } from "@context/product-context";
import { CartProvider } from "@context/cart-context";
import client from "lib/apollo-config";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from "@mantine/core";
import { OrderProvider } from "@context/order-context";
import { DesignProvider } from "@context/design-context";
import RegistrationStepsModal from "@modules/layout/templates/registration-steps-modal";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps<{}>) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <DesignProvider>
            <AccountProvider>
              <ResourcesProvider>
                <Component {...pageProps} />
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
    if (collaborator.status == "ACTIVE") {
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
