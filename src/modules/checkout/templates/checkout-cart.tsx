import { useCart } from "@context/cart-context";
import {
  Center,
  Stack,
  Text,
  Button,
  Card,
  Grid,
  Group,
  Space,
  Title,
  Divider,
  Box,
  MediaQuery,
} from "@mantine/core";
import CartView from "@modules/my-cart/templates/cart-view";
import { useRouter } from "next/router";
import EmptyCart from "../components/empty-cart";
import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const CheckoutCart = () => {
  const { cart } = useCart();
  const [saving, setSaving] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
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
    if (cart) {
      setSaving(calculateTotalRefPrice() - cart.total);
      const items = cart.suborders.flatMap((subOrder) => subOrder.items);
      setTotal(items.length);
    }
  }, [cart]);

  if (!cart) {
    return <EmptyCart />;
  }

  const GoToPay = () => {
    amplitude.track("Finalizar Compra Button");
    router.push("/checkout");
  };

  if (cart.suborders.length == 0) {
    return <EmptyCart />;
  }

  return (
    <Box ml="xl">
      <Title order={2} px="sm">
        Mi Carrito ({total} Productos)
      </Title>
      <Grid w="100%" mt={20}>
        <MediaQuery
          smallerThan="md"
          styles={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Grid.Col span="auto" px="xl">
            <CartView cart={cart} />
          </Grid.Col>
        </MediaQuery>
        <MediaQuery
          smallerThan="md"
          styles={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Grid.Col span={12} md={3}>
            <Stack align="center">
              <Card w="100%" p="sm" radius="xs" withBorder fz={15}>
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
                  <Text>-</Text>
                </Group>
                <Divider my={5} style={{ border: "1px solid black" }} />
                <Group position="apart">
                  <Text>Total:</Text>
                  <Text>S/.{cart.total.toFixed(2)}</Text>
                </Group>
                <Space h="lg" />
                <Text
                  fz={10}
                  color="gray.6"
                >{`(Ahorro estimado: S/.${saving.toFixed(2)})`}</Text>
                <Text fz={10} color="gray.6">
                  Gastos de envío calculados más adelante.
                </Text>
                <Space h="xl" />
                <Space h="xl" />
                <Center>
                  <Button radius="xs" fz={18} w="80%" onClick={GoToPay}>
                    Finalizar Compra
                  </Button>
                </Center>
              </Card>
            </Stack>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </Box>
  );
};

export default CheckoutCart;
