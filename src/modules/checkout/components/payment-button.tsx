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

const PaymentButton = ({ form }: { form: UseFormReturnType<BillingForm> }) => {
  const {
    cart,
    useStars,
    setUseStars,
    checked,
    setChecked,
    hasAcceptedTerms,
    setHasAcceptedTerms,
  } = useCart();
  const { collaborator } = useAccount();
  const [totalAmount, setTotalAmount] = useState(0);
  const [toPay, setToPay] = useState(false);

  useEffect(() => {
    if (
      form.values.businessname ||
      form.values.ruc ||
      form.values.fiscaladdress
    ) {
      setChecked("bill");
    }
    setHasAcceptedTerms(false);
    setUseStars(false);
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
      </Stack>
    </Center>
  );
};

export default PaymentButton;
