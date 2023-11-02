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
} from "@mantine/core";
import EmptyCart from "../components/empty-cart";
import CheckoutForm from "./checkout-form";
import { useEffect, useState } from "react";
import { IconShoppingCart } from "@tabler/icons-react";

const CheckoutTemplate = () => {
  const { cart } = useCart();
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
    setSaving(calculateTotalRefPrice());
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
        <Stack ml={40} w="95%" align="start">
          <Title fz={25} align="start" order={2}>
            Checkout
          </Title>
        </Stack>
      </Center>
      <Center w="100%">
        <Grid ml={30} w="95%" mt={0}>
          <Grid.Col span="auto" pl={0}>
            <CheckoutForm />
          </Grid.Col>
          {/* <Divider size="sm" orientation="vertical" /> */}
          <Grid.Col span={12} md={3}>
            <Stack align="center">
              <Card w="90%" radius="md" withBorder fz={15}>
                <Title order={3} fz={20}>
                  Resumen
                </Title>
                <Space h="md" />
                <Group position="apart">
                  <Text>Subtotal:</Text>
                  <Text>S/.{cart.total}</Text>
                </Group>
                <Group position="apart">
                  <Text>Envío:</Text>
                  <Text>
                    {deliveryprice === 0
                      ? "-"
                      : `S/.${deliveryprice.toFixed(2)}`}
                  </Text>
                </Group>
                <Divider my={5} style={{ border: "1px solid black" }} />
                <Group position="apart">
                  <Text>Total:</Text>
                  <Text>S/.{cart.total}</Text>
                </Group>
                <Space h="lg" />
                <Text
                  fz={10}
                  color="gray.6"
                >{`(Ahorro estimado: ${saving})`}</Text>
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
