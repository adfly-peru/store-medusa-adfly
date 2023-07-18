import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useOrder } from "@context/order-context";
import { useCart } from "@context/cart-context";
import { Button, Center } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons";

declare global {
  interface Window {
    VisanetCheckout: any;
  }
}

const createSessionToken = async (
  accessToken: string,
  productAmount: number
): Promise<string | null> => {
  try {
    const response = await axios.post(
      "https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/456879852",
      {
        channel: "web",
        amount: productAmount,
        antifraud: {
          clientIp: "24.252.107.29", // Reemplaza esto con la IP del cliente
          merchantDefineData: {
            MDD15: "Valor MDD 15",
            MDD20: "Valor MDD 20",
            MDD33: "Valor MDD 33",
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );
    const status = response.status;
    if (status == 201 || status == 200) {
      return response.data.sessionKey;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const createToken = async (): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://apitestenv.vnforapps.com/api.security/v1/security",
      {
        headers: {
          accept: "text/plain",
          authorization:
            "Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG",
        },
      }
    );
    const status = response.status;
    if (status == 201 || status == 200) {
      return response.data;
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
    const accessToken = await createToken();
    if (!accessToken) return;
    const totalAmount = parseFloat((cart.total * 1.18).toFixed(2));
    const sessionToken = await createSessionToken(accessToken, totalAmount);
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
        Total a Pagar: S/.{(cart.total * 1.18).toFixed(2)}
      </Button>
    </Center>
  );
};

export default PaymentButton;
