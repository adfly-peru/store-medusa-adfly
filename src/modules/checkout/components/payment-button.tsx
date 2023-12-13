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
  const { cart } = useCart();
  const { collaborator, daysInApp } = useAccount();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [checked, setChecked] = useState("ticket");

  const payment = async () => {
    if (!cart || !collaborator) return;
    const infoerror = await submitInfo(checked);
    if (infoerror) return;
    const totalAmountFixed = parseFloat(totalAmount.toFixed(2));
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
      total: totalAmount,
    });
    window.VisanetCheckout.configure({
      sessiontoken: `${sessionToken}`,
      channel: "web",
      merchantid: process.env.NEXT_PUBLIC_MERCHANT_ID,
      purchasenumber: cart.purchaseNumber,
      amount: totalAmount,
      expirationminutes: "20",
      timeouturl: "about:blank",
      merchantlogo: "https://www.adfly.pe/Content/logo.png",
      merchantname: "Adfly",
      formbuttoncolor: "#31658E",
      action: `api/payment?purchaseNumber=${cart.purchaseNumber}&amount=${totalAmount}&collaboratorid=${collaborator?.uuidcollaborator}`,
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
        <Stack spacing={0}>
          <Text fz={20} fw={700}>
            Datos de Envío
          </Text>
          <Divider m={0} />
        </Stack>
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
        {/* <Radio.Group value={checked} onChange={setChecked} withAsterisk>
          <Radio value="ticket" label="Boleta" />
          <Radio value="bill" label="Factura" />
        </Radio.Group> */}
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
        <Stack spacing={0}>
          <Text fz={20} fw={700}>
            Métodos de Pago
          </Text>
          <Divider m={0} />
        </Stack>
        {/* <Text>
          El pedido equivale a {(cart.total / 0.1).toFixed(2)} Estrellas. Sin
          embargo, en caso tenga un costo de delivery, este deberá ser pagado
          por separado utilizando alguna otra de las alternativas. Además, si la
          cantidad de estrellas que tiene no alcanza para todo el pedido, esa
          diferencia también tendrá que pagarla con otro medio de pago.
        </Text> */}
        <Accordion variant="separated">
          <Accordion.Item value="online">
            <Accordion.Control bg="#F2F2F3" icon={<IconCreditCard />}>
              Pago en Línea
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Text>
                  Paga en línea de manera simple, segura y rápida. Trabajamos
                  con NIUBIZ para garantizar un pago exitoso. Aceptamos las
                  siguientes tarjetas:
                </Text>
                <Image
                  src="https://adfly.pe/Content/backend/img/payment/online.png"
                  width="50%"
                  fit="contain"
                />
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
                <Stack align="flex-end">
                  <Button
                    leftIcon={<IconCreditCard />}
                    onClick={payment}
                    radius="md"
                    disabled={!hasAcceptedTerms}
                  >
                    Pagar: S/.{totalAmount.toFixed(2)}
                  </Button>
                </Stack>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Center>
          <Group w="60%" position="center" mt="xl">
            <Button w={200} h={48} onClick={() => handlePrevStep()}>
              {"Regresar"}
            </Button>
          </Group>
        </Center>
      </Stack>
    </Center>
  );
};

export default PaymentButton;
