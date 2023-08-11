import React, { useEffect } from "react";
import axios from "axios";
import { useCart } from "@context/cart-context";
import { Button, Center } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons";

declare global {
  interface Window {
    VisanetCheckout: any;
  }
}

const createSessionToken = async (
  productAmount: number
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/session`,
      {
        amount: productAmount,
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
  const { cart } = useCart();
  const payment = async () => {
    if (!cart) return;
    const totalAmount = parseFloat(cart.total.toFixed(2));
    const sessionToken = await createSessionToken(totalAmount);
    if (!sessionToken) return;
    window.VisanetCheckout.configure({
      sessiontoken: `${sessionToken}`,
      channel: "web",
      merchantid: "456879852",
      purchasenumber: cart.purchaseNumber,
      amount: totalAmount,
      expirationminutes: "20",
      timeouturl: "about:blank",
      action: `api/payment?purchaseNumber=${cart.purchaseNumber}&amount=${totalAmount}`,
    });

    window.VisanetCheckout.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true";
    document.body.appendChild(script);
  }, []);

  if (!cart) {
    return <div>Vacio</div>;
  }

  return (
    <Center>
      <Button
        leftIcon={<IconCreditCard />}
        onClick={payment}
        size="xl"
        radius="xl"
        uppercase
      >
        Total a Pagar: S/.{cart.total.toFixed(2)}
      </Button>
    </Center>
  );
};

export default PaymentButton;
