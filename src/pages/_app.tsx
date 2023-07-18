import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "@context/account-context";
import { ProductProvider } from "@context/product-context";
import { CartProvider } from "@context/cart-context";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import client from "lib/apollo-config";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { OrderProvider } from "@context/order-context";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
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
          <SessionProvider session={session}>
            <AccountProvider>
              <ProductProvider>
                <CartProvider>
                  <OrderProvider>
                    <Component {...pageProps} />
                  </OrderProvider>
                </CartProvider>
              </ProductProvider>
            </AccountProvider>
          </SessionProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
}
