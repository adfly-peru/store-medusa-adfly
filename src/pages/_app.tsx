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
import { CssBaseline, Fab } from "@mui/material";
import Authentication from "@modules/authentication/templates";
import { CategoriesProvider } from "@context/categories-context";
import AppHeader from "@modules/components/Header";
import AppFooter from "@modules/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoadingScreen from "@modules/components/LoadingScreen";
import { DesignContainer, DesignProvider } from "@context/design-context";
import { WhatsApp } from "@mui/icons-material";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@lib/apollo-config";

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
        <ApolloProvider client={apolloClient}>
          <AccountProvider>
            <CartProvider>
              <DesignProvider>
                <DesignContainer>
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
                      <LoadingScreen />
                      <Authentication>
                        <AppHeader />
                        <div
                          style={{
                            minHeight: "1200px",
                          }}
                        >
                          <Component {...pageProps} />
                        </div>
                        <Fab
                          color="primary"
                          aria-label="whatsapp"
                          onClick={() =>
                            window.open(
                              "https://wa.me/51970802065?text=Hola,%20tengo%20una%20consulta"
                            )
                          }
                          sx={{ position: "fixed", bottom: 16, right: 16 }}
                        >
                          <WhatsApp />
                        </Fab>
                        <AppFooter />
                      </Authentication>
                    </LoadScript>
                  </CategoriesProvider>
                </DesignContainer>
              </DesignProvider>
            </CartProvider>
          </AccountProvider>
        </ApolloProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
