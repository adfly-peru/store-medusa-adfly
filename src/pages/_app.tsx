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
import { DesignProvider, useDesign } from "@context/design-context";
import RegistrationStepsModal from "@modules/layout/templates/registration-steps-modal";
import { LoadScript } from "@react-google-maps/api";
import "@fontsource/rubik";
import "@fontsource/open-sans";
import { CouponProvider } from "@context/coupon-context";
import Head from "next/head";

const adflyColors = {
  default: "#31658E",
  pressed: "#3D7FB2",
  hover: "#234966",
  disabled: "#A8C8E1",
};

const googleMapsLibraries = ["places"];

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
          theme={{
            fontFamily: "Open Sans, sans-serif",
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
                      backgroundColor: "#CECECE",
                      color: "white",
                    },
                  },
                  label: {
                    whiteSpace: "pre-line",
                  },
                }),
              },
              NavLink: {
                styles: (theme) => ({
                  root: {
                    backgroundColor: "white",
                    "&[data-active]": {
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: 700,
                      "&:hover": {
                        backgroundColor: "#f8f9fa",
                      },
                    },
                  },
                }),
              },
              Checkbox: {
                styles: (theme) => ({
                  icon: {
                    color: "#5C98C7 !important",
                  },
                  input: {
                    "&:checked": {
                      border: "2px solid #5C98C7",
                      backgroundColor: "white",
                    },
                    border: "2px solid #5C98C7",
                  },
                }),
              },
              InputWrapper: {
                styles: (theme) => ({
                  label: {
                    fontWeight: 600,
                    fontSize: 15,
                  },
                }),
              },
              Input: {
                styles: (theme) => ({
                  input: {
                    "&[data-disabled]": {
                      border: "0px",
                      backgroundColor: "#F2F2F3",
                      color: "#86888A",
                    },
                    borderColor: "#737A82",
                    color: "#737A82",
                    borderRadius: rem(8),
                  },
                }),
              },
              Select: {
                styles: (theme) => ({
                  item: {
                    "&[data-selected]": {
                      backgroundColor: adflyColors.default,
                      "&, &:hover": {
                        backgroundColor: adflyColors.default,
                      },
                    },
                    "&[data-hovered]": {},
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
                <ResourcesProvider>
                  <Component {...pageProps} />
                </ResourcesProvider>
              </LoadScript>
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
  const { loginDesign } = useDesign();

  if (status == "authenticated") {
    if (!collaborator) {
      return (
        <>
          <Head>
            <title>
              {loginDesign?.commercialname
                ? `${loginDesign?.commercialname}`
                : "Tienda Adfly"}
            </title>
          </Head>
          <LoadingOverlay visible={true} />
        </>
      );
    }
    if (collaborator.emailVerify && collaborator.changePassword) {
      return (
        <>
          <Head>
            <title>
              {loginDesign?.commercialname
                ? `${loginDesign?.commercialname}`
                : "Tienda Adfly"}
            </title>
          </Head>
          <ProductProvider>
            <CartProvider>
              <CouponProvider>
                <OrderProvider>{children}</OrderProvider>
              </CouponProvider>
            </CartProvider>
          </ProductProvider>
        </>
      );
    }
    return (
      <>
        <Head>
          <title>
            {loginDesign?.commercialname
              ? `${loginDesign?.commercialname}`
              : "Tienda Adfly"}
          </title>
        </Head>
        <RegistrationStepsModal>{children}</RegistrationStepsModal>
      </>
    );
  }

  return (
    <>
      <>
        <Head>
          <title>
            {loginDesign?.commercialname
              ? `${loginDesign?.commercialname}`
              : "Tienda Adfly"}
          </title>
        </Head>
        {children}
      </>
    </>
  );
};
