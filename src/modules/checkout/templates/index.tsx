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
} from "@mantine/core";
import EmptyCart from "../components/empty-cart";
import CheckoutForm from "./checkout-form";
import { useEffect, useState } from "react";
import { useAccount } from "@context/account-context";

const CheckoutTemplate = () => {
  const { collaborator } = useAccount();
  const { cart, useStars } = useCart();
  const [saving, setSaving] = useState(0);
  const [deliveryprice, setDeliveryprice] = useState(0);

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
            <CheckoutForm />
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
                <Group position="apart">
                  <Text>Total:</Text>
                  <Text>
                    S/.
                    {(
                      cart.total +
                      deliveryprice -
                      ((cart.total + deliveryprice) * 100 <
                      (collaborator?.stars ?? 0)
                        ? parseFloat(
                            ((cart.total + deliveryprice) * 100).toFixed(0)
                          )
                        : collaborator?.stars ?? 0) /
                        100
                    ).toFixed(2)}
                  </Text>
                </Group>
                <Space h="lg" />
                <Text
                  fz={10}
                  color="gray.6"
                >{`(Ahorro estimado: S/.${saving.toFixed(2)})`}</Text>
                <Space h="xl" />
                <Space h="xl" />
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Center>
    </>
  );
};

export default CheckoutTemplate;
