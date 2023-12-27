import { useCart } from "@context/cart-context";
import {
  Grid,
  Divider,
  Stack,
  Title,
  Card,
  Group,
  Text,
  Space,
  Center,
  Button,
  UnstyledButton,
} from "@mantine/core";
import EmptyCart from "../components/empty-cart";
import CheckoutForm from "./checkout-form";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";
import axios from "axios";
import * as amplitude from "@amplitude/analytics-browser";
import { BillingForm } from "@interfaces/billing";
import { useForm } from "@mantine/form";
import { IconCreditCard, IconStarFilled } from "@tabler/icons-react";

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

const CheckoutTemplate = () => {
  const {
    cart,
    useStars,
    editBilling,
    payCartWithStars,
    checked,
    hasAcceptedTerms,
  } = useCart();
  const { collaborator, daysInApp } = useAccount();
  const [saving, setSaving] = useState(0);
  const [deliveryprice, setDeliveryprice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [active, setActive] = useState(0);

  const billingform = useForm<BillingForm>({
    initialValues: {
      name: collaborator?.name ?? "",
      lastname: collaborator?.lastname ?? "",
      doctype: collaborator?.documenttype ?? "",
      doc: collaborator?.documentnumber ?? "",
      email: collaborator?.email ?? "",
      phone: cart?.billingInfo?.phone ?? collaborator?.phonenumber ?? "",
      ruc: cart?.billingInfo?.ruc ?? "",
      businessname: cart?.billingInfo?.businessname ?? "",
      fiscaladdress: cart?.billingInfo?.fiscaladdress ?? "",
    },
    validate: {
      phone: (value) =>
        value?.length ?? 0 > 0 ? null : "Este campo es requerido",
    },
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (!cart) return;
    const totaldelivery = cart.suborders.reduce(
      (acc, curr) => acc + (curr.deliveryprice ?? 0),
      cart.total
    );
    setTotalAmount(totaldelivery);
  }, [cart]);

  useEffect(() => {
    if (!cart) return;
    const totaldelivery = cart.suborders.reduce(
      (acc, curr) => acc + (curr.deliveryprice ?? 0),
      0
    );
    setDeliveryprice(totaldelivery);
    const calculateTotalRefPrice = () => {
      if (!cart) return 0;

      return cart.suborders.reduce((suborderTotal, suborder) => {
        return (
          suborderTotal +
          suborder.items.reduce((itemTotal, item) => {
            return itemTotal + item.quantity * item.variant.refPrice;
          }, 0)
        );
      }, 0);
    };
    setSaving(calculateTotalRefPrice() - (cart.total - totaldelivery));
  }, [cart]);

  const funcOnPaymentButton = async (checked: string) => {
    billingform.clearErrors();
    if (checked === "bill") {
      let valids = 0;
      if ((billingform.values.ruc?.length ?? 0) == 0) {
        valids += 1;
        billingform.setFieldError("ruc", "RUC es obligatorio");
      }
      if ((billingform.values.businessname?.length ?? 0) <= 0) {
        valids += 1;
        billingform.setFieldError(
          "businessname",
          "Nombre de la empresa es obligatorio"
        );
      }
      if ((billingform.values.fiscaladdress?.length ?? 0) <= 0) {
        valids += 1;
        billingform.setFieldError(
          "fiscaladdress",
          "Dirección Fiscal es obligatoria"
        );
      }
      if (valids === 0) {
        return await editBilling(billingform.values);
      }
    } else {
      return await editBilling(billingform.values);
    }
    return "Complete los campos obligatorios";
  };

  const payment = async () => {
    if (!cart || !collaborator) return;
    const infoerror = await funcOnPaymentButton(checked);
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

  if (!cart) {
    return <EmptyCart />;
  }

  if (cart.suborders.length == 0) {
    return <EmptyCart />;
  }
  return (
    <>
      <Center w="100%">
        <Stack w="95%" align="start" pl={8}>
          <Title fz={25} align="start" order={2}>
            Checkout
          </Title>
        </Stack>
      </Center>
      <Center w="100%">
        <Grid w="95%" mt={0}>
          <Grid.Col span="auto">
            <CheckoutForm
              billingform={billingform}
              active={active}
              setActive={setActive}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </Grid.Col>
          {/* <Divider size="sm" orientation="vertical" /> */}
          <Grid.Col span={12} md={3}>
            <Stack align="center">
              <Card w="100%" radius="md" withBorder fz={15}>
                <Title order={3} fz={20}>
                  Resumen
                </Title>
                <Space h="md" />
                <Group position="apart">
                  <Text>Subtotal:</Text>
                  <Text>S/.{cart.total.toFixed(2)}</Text>
                </Group>
                <Group position="apart">
                  <Text>Envío:</Text>
                  <Text>
                    {deliveryprice === 0
                      ? "-"
                      : `S/.${deliveryprice.toFixed(2)}`}
                  </Text>
                </Group>
                {useStars ? (
                  <Group position="apart" c="red">
                    <Text>Dscto. Estrellas:</Text>
                    <Text>
                      {`- S/.${(
                        ((cart.total + deliveryprice) * 100 <
                        (collaborator?.stars ?? 0)
                          ? parseFloat(
                              ((cart.total + deliveryprice) * 100).toFixed(0)
                            )
                          : collaborator?.stars ?? 0) / 100
                      ).toFixed(2)}`}
                    </Text>
                  </Group>
                ) : (
                  <></>
                )}
                <Divider my={5} style={{ border: "1px solid black" }} />
                <Group position="apart" fw="bold">
                  <Text>Total:</Text>
                  <Text>
                    S/.
                    {(
                      cart.total +
                      deliveryprice -
                      (useStars
                        ? ((cart.total + deliveryprice) * 100 <
                          (collaborator?.stars ?? 0)
                            ? parseFloat(
                                ((cart.total + deliveryprice) * 100).toFixed(0)
                              )
                            : collaborator?.stars ?? 0) / 100
                        : 0)
                    ).toFixed(2)}
                  </Text>
                </Group>
                <Space h="lg" />
                <Text
                  fz={10}
                  color="gray.6"
                >{`(Ahorro estimado: S/.${saving.toFixed(2)})`}</Text>
                <Space h="xl" />
              </Card>
              <Card w="100%" p="sm" radius="xs" withBorder fz={15}>
                <Title order={3} fz={20}>
                  Resumen en estrellas
                </Title>
                <Group mt="sm" position="apart" fw="bold" fz="sm" c="yellow">
                  <Group spacing="xs">
                    <Text>Estrellas</Text>
                    <IconStarFilled size={20} />
                  </Group>
                  <Text>{((cart.total + deliveryprice) * 100).toFixed(0)}</Text>
                </Group>
              </Card>
              {active === 2 ? (
                <Stack w="100%" spacing="xl">
                  <Button
                    mt="md"
                    w="100%"
                    h={48}
                    disabled={!hasAcceptedTerms}
                    onClick={() => payment()}
                    leftIcon={<IconCreditCard />}
                  >
                    {"Pagar"}
                  </Button>
                  <UnstyledButton
                    w="100%"
                    c="#31658E"
                    fw={900}
                    ta="center"
                    fz={18}
                    onClick={prevStep}
                  >
                    Regresar a datos de envío
                  </UnstyledButton>
                </Stack>
              ) : (
                <></>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Center>
    </>
  );
};

export default CheckoutTemplate;
