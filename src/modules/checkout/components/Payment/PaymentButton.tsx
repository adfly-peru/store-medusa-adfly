import { useAccount } from "@context/account-context";
import { useCart } from "@context/cart-context";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import { formatPrice } from "@modules/common/functions/format-number";
import { Button } from "@mui/material";
import { payCart } from "api/cart";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import LoadingButton from "@modules/components/LoadingButton";

const createSessionToken = async (
  productAmount: number,
  customerEmail: string,
  activeCustomer: boolean,
  documentNumber: string,
  daysInApp: number
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/session`,
      {
        amount: productAmount,
        customerEmail: customerEmail,
        activeCustomer: activeCustomer,
        documentNumber: documentNumber,
        daysInApp: daysInApp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const status = response.status;
    if (status == 201 || status == 200) {
      return response.data.data.data.sessionKey;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const PaymentButton = () => {
  const { collaborator } = useAccount();
  const router = useRouter();
  const { data: session } = useSession();
  const { cart } = useCart();
  const { finalPrice, useStars, terms, onlinePay, handlerBillingInfo } =
    useCheckout();

  const starsValue = useMemo(
    () => formatPrice((collaborator?.stars ?? 0) / 100),
    [collaborator?.stars]
  );
  const starsDiscount = useMemo(
    () => formatPrice(Math.min(starsValue, finalPrice)),
    [starsValue, finalPrice]
  );

  const isActive = useMemo(() => {
    return (
      terms && (useStars ? starsValue >= finalPrice || onlinePay : onlinePay)
    );
  }, [finalPrice, onlinePay, starsValue, terms, useStars]);

  const handlerPayment = async () => {
    if (!collaborator || !cart) return;
    await handlerBillingInfo();
    const priceToPay = formatPrice(finalPrice - (useStars ? starsDiscount : 0));
    if (priceToPay === 0 && useStars) {
      const routeResponse = await payCart(
        cart.purchaseNumber,
        cart,
        finalPrice,
        starsDiscount * 100
      );
      router.push(routeResponse ?? "/error?message=SinDetalles");
      return;
    }
    // use niubiz to pay
    const sessionToken = await createSessionToken(
      priceToPay,
      collaborator.email ?? "",
      true,
      collaborator.documentnumber,
      0
    );
    if (!sessionToken) return;
    amplitude.track("Boton de Pago Clickeado", {
      purchaseNumber: cart.purchaseNumber,
    });

    (window as any).VisanetCheckout.configure({
      sessiontoken: `${sessionToken}`,
      channel: "web",
      merchantid: process.env.NEXT_PUBLIC_MERCHANT_ID,
      purchasenumber: cart.purchaseNumber,
      amount: priceToPay,
      expirationminutes: "20",
      timeouturl: "about:blank",
      merchantlogo: "https://tienda.adfly.com.pe/logo_adfly.svg",
      merchantname: "Adfly",
      formbuttoncolor: "#31658E",
      action: `api/payment?purchaseNumber=${
        cart.purchaseNumber
      }&amount=${finalPrice}&collaboratorid=${
        collaborator?.uuidcollaborator
      }&stars=${starsDiscount * 100}&accessToken=${session?.user?.accessToken}`,
    });

    (window as any).VisanetCheckout.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <LoadingButton
      variant="contained"
      fullWidth
      disabled={!isActive}
      asyncFunction={handlerPayment}
      sx={{
        fontSize: 16,
      }}
    >
      Pagar S/. {(finalPrice - (useStars ? starsDiscount : 0)).toFixed(2)}
    </LoadingButton>
  );
};

export default PaymentButton;
