import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "@context/cart-context";
import {
  Accordion,
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
  Image,
  Divider,
  Card,
} from "@mantine/core";
import { IconCircleFilled, IconCreditCard } from "@tabler/icons-react";
import { UseFormReturnType } from "@mantine/form";
import { BillingForm } from "@interfaces/billing";
import { useAccount } from "@context/account-context";
import * as amplitude from "@amplitude/analytics-browser";

declare global {
  interface Window {
    VisanetCheckout: any;
  }
}

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

const PaymentButton = ({
  form,
  submitInfo,
  handlePrevStep,
}: {
  form: UseFormReturnType<BillingForm>;
  submitInfo: (checked: string) => Promise<string | null>;
  handlePrevStep: () => void;
}) => {
  const { cart, useStars, setUseStars, payCartWithStars } = useCart();
  const { collaborator, daysInApp } = useAccount();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checked, setChecked] = useState("ticket");
  const [toPay, setToPay] = useState(false);

  const payment = async () => {
    if (!cart || !collaborator) return;
    const infoerror = await submitInfo(checked);
    if (infoerror) return;
    let totalAmountFixed = parseFloat(totalAmount.toFixed(2));
    let starsToUse = 0;
    if (useStars) {
      starsToUse =
        totalAmount * 100 < (collaborator?.stars ?? 0)
          ? parseFloat((totalAmount * 100).toFixed(0))
          : collaborator?.stars ?? 0;
      totalAmountFixed = totalAmountFixed - starsToUse / 100;
    }
    if (totalAmountFixed === 0) {
      await payCartWithStars(cart.purchaseNumber, totalAmountFixed, starsToUse);
      return;
    }
    const sessionToken = await createSessionToken(
      totalAmountFixed,
      collaborator.email ?? "",
      true,
      collaborator.documentnumber,
      daysInApp
    );
    if (!sessionToken) return;
    amplitude.track("Boton de Pago Clickeado", {
      purchaseNumber: cart.purchaseNumber,
    });
    window.VisanetCheckout.configure({
      sessiontoken: `${sessionToken}`,
      channel: "web",
      merchantid: process.env.NEXT_PUBLIC_MERCHANT_ID,
      purchasenumber: cart.purchaseNumber,
      amount: totalAmountFixed,
      expirationminutes: "20",
      timeouturl: "about:blank",
      merchantlogo: "https://www.adfly.pe/Content/logo.png",
      merchantname: "Adfly",
      formbuttoncolor: "#31658E",
      action: `api/payment?purchaseNumber=${cart.purchaseNumber}&amount=${totalAmount}&collaboratorid=${collaborator?.uuidcollaborator}&stars=${starsToUse}`,
    });

    window.VisanetCheckout.open();
  };

  useEffect(() => {
    if (
      form.values.businessname ||
      form.values.ruc ||
      form.values.fiscaladdress
    ) {
      setChecked("bill");
    }
  }, []);

  useEffect(() => {
    if (!cart) return;
    const totaldelivery = cart.suborders.reduce(
      (acc, curr) => acc + (curr.deliveryprice ?? 0),
      cart.total
    );
    setTotalAmount(totaldelivery);
  }, [cart]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "";
    document.body.appendChild(script);
  }, []);

  if (!cart) {
    return <div>Vacio</div>;
  }

  return (
    <Center py="md" px="lg">
      <Stack w="100%">
        <Card withBorder>
          <Stack>
            <Text fz={20} fw={700}>
              Datos de Facturación
            </Text>
            <Group position="left">
              <Checkbox
                checked={checked == "ticket"}
                onChange={(_) => {
                  setChecked("ticket");
                  form.setValues({
                    ruc: "",
                    businessname: "",
                    fiscaladdress: "",
                  });
                }}
                icon={IconCircleFilled}
                radius="lg"
                value={"ticket"}
                label="Boleta"
              />
              <Checkbox
                checked={checked == "bill"}
                onChange={(_) => setChecked("bill")}
                radius="lg"
                icon={IconCircleFilled}
                value={"bill"}
                label="Factura"
              />
            </Group>
            {checked === "bill" ? (
              <Stack px={0} spacing="sm">
                <Group position="apart" spacing="xl" grow>
                  <TextInput
                    withAsterisk
                    label="Ruc:"
                    {...form.getInputProps("ruc")}
                  />
                  <TextInput
                    withAsterisk
                    label="Razón Social:"
                    {...form.getInputProps("businessname")}
                  />
                </Group>
                <TextInput
                  withAsterisk
                  label="Dirección Fiscal:"
                  {...form.getInputProps("fiscaladdress")}
                />
              </Stack>
            ) : null}
          </Stack>
        </Card>
        <Card withBorder>
          <Text fz={20} fw={700} mb="xs">
            Usar Estrellas
          </Text>
          <Text>{`Valor del pedido: ${(totalAmount * 100).toFixed(
            0
          )} estrellas`}</Text>
          <Text>{`Cuentas con: ${collaborator?.stars ?? 0} estrellas`}</Text>
          <Checkbox
            mt="xs"
            label={`Deseo usar ${
              totalAmount * 100 < (collaborator?.stars ?? 0)
                ? (totalAmount * 100).toFixed(0)
                : collaborator?.stars ?? 0
            } estrellas para pagar este pedido`}
            checked={useStars}
            onChange={(e) => setUseStars(e.currentTarget.checked)}
          />
        </Card>
        <Text fz={20} fw={700}>
          Métodos de Pago
        </Text>
        <Card withBorder>
          <Text fz={20} fw={700} mb="xs">
            Pago en Línea
          </Text>
          <Group position="apart" pr="xl">
            <Stack>
              <Group spacing={5}>
                <Text>{"Garantizamos un pago 100% seguro y exitoso con "}</Text>
                <Image
                  height={13}
                  width="inherit"
                  fit="contain"
                  src="/niubiz.svg"
                />
              </Group>
              <Image
                src="https://adfly.pe/Content/backend/img/payment/online.png"
                width="70%"
                fit="contain"
              />
            </Stack>
            <Radio
              labelPosition="left"
              checked={toPay}
              disabled={
                useStars && (collaborator?.stars ?? 0) / 100 > totalAmount
              }
              onChange={(event) => setToPay(event.currentTarget.checked)}
            />
          </Group>
        </Card>
        <Checkbox
          m="md"
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
        <Center>
          <Group w="60%" position="center" mt="xl">
            <Button w={200} h={48} onClick={() => handlePrevStep()}>
              {"Regresar"}
            </Button>
            <Button
              w={200}
              h={48}
              disabled={!hasAcceptedTerms}
              onClick={() => payment()}
            >
              {"Pagar"}
            </Button>
          </Group>
        </Center>
      </Stack>
    </Center>
  );
};

export default PaymentButton;
