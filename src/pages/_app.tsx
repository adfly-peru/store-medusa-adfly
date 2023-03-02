import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "@context/account-context";
import { ProductProvider } from "@context/product-context";
import { CartProvider } from "@context/cart-context";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import client from "lib/apollo-config";
import { ApolloProvider } from "@apollo/client";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <AccountProvider>
          <ProductProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </ProductProvider>
        </AccountProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
