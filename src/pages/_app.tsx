import type { AppProps } from "next/app";
import { AccountProvider } from "@context/account-context";
import { CartProvider } from "@context/cart-context";
import { useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import "@fontsource/rubik";
import "@fontsource/open-sans";
import * as amplitude from "@amplitude/analytics-browser";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@styles/theme";
import Authentication from "@modules/authentication/templates";
import { ClientProvider } from "@context/client-context";
import { CategoriesProvider } from "@context/categories-context";
import AppHeader from "@modules/components/Header";
import AppFooter from "@modules/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleMapsLibraries = ["places"];

interface MyAppProps extends AppProps {
  pageProps: { session?: Session };
}

export default function App(props: MyAppProps) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  useEffect(() => {
    if (typeof window !== "undefined") {
      amplitude.init("17d5496d832d039b1eb6e91b0ac04b78");
    }
  }, []);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_GOOGLE_CLIENT_ID ?? ""}>
      <SessionProvider session={session}>
        <ClientProvider>
          <AccountProvider>
            <CartProvider>
              <ThemeProvider theme={theme}>
                <CategoriesProvider>
                  <LoadScript
                    googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
                    libraries={googleMapsLibraries as any}
                    onLoad={() => {
                      console.log("Script Loaded!");
                    }}
                    onError={(error) => {
                      console.error("Error cargando Google Maps", error);
                    }}
                  >
                    <CssBaseline />
                    <Authentication>
                      <AppHeader />
                      <div
                        style={{
                          minHeight: "1200px",
                        }}
                      >
                        <Component {...pageProps} />
                      </div>

                      <AppFooter />
                    </Authentication>
                  </LoadScript>
                </CategoriesProvider>
              </ThemeProvider>
            </CartProvider>
          </AccountProvider>
        </ClientProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
