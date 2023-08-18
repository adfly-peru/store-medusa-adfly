import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "@context/cart-context";
import { Anchor, Button, Center, Checkbox, Stack, Text } from "@mantine/core";
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
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    if (!cart) return;
    const totaldelivery = cart.suborders.reduce(
      (acc, curr) => acc + (curr.deliveryprice ?? 0),
      cart.total
    );
    setTotalAmount(totaldelivery);
  }, [cart]);

  const payment = async () => {
    if (!cart) return;
    const totalAmountFixed = parseFloat(totalAmount.toFixed(2));
    const sessionToken = await createSessionToken(totalAmountFixed);
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
    <Center py="md" px="lg">
      <Stack>
        <Text>
          El pedido equivale a {(cart.total / 0.1).toFixed(2)} Estrellas. Sin
          embargo, en caso tenga un costo de delivery, este deberá ser pagado
          por separado utilizando alguna otra de las alternativas. Además, si la
          cantidad de estrellas que tiene no alcanza para todo el pedido, esa
          diferencia también tendrá que pagarla con otro medio de pago.
        </Text>
        <Checkbox
          label={
            <>
              He leído y acepto los{" "}
              <Anchor href="/terms" target="_blank">
                Términos y Condiciones
              </Anchor>{" "}
              de este sitio
            </>
          }
          checked={hasAcceptedTerms}
          onChange={(e) => setHasAcceptedTerms(e.currentTarget.checked)}
        />
        <Button
          leftIcon={<IconCreditCard />}
          onClick={payment}
          radius="xl"
          uppercase
          disabled={!hasAcceptedTerms}
        >
          Pagar: S/.{totalAmount.toFixed(2)}
        </Button>
      </Stack>
    </Center>
  );
};

export default PaymentButton;
