import "@styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "@context/account-context";
import { ProductProvider } from "@context/product-context";
import { CartProvider } from "@context/cart-context";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <AccountProvider>
        <ProductProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </ProductProvider>
      </AccountProvider>
    </SessionProvider>
  );
}
