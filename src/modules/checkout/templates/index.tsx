import { useCart } from "@context/cart-context";
import { Grid, Divider, Stack, Title, Card, Group, Text, Space, Center, Button } from "@mantine/core";
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
    <Title order={2} px="sm">Checkout</Title>
    <Grid w="100%" mt={20}>
      <Grid.Col span="auto" px="xl">
        <CheckoutForm />
      </Grid.Col>
      {/* <Divider size="sm" orientation="vertical" /> */}
      <Grid.Col span={12} lg={3}>
        <Stack align="center">
          <Card w="90%" shadow="sm" p="lg" radius="md" withBorder>
            <Title>Resumen</Title>
            <Group position="apart">
              <Text>Subtotal:</Text>
              <Text>
                S/.{cart.total}
              </Text>
            </Group>
            <Group position="apart">
              <Text>Envío:</Text>
              <Text>-</Text>
            </Group>
            <Group position="apart">
              <Text>Total:</Text>
              <Text>
                S/.{cart.total}
              </Text>
            </Group>
            <Space h="xs" />
            <Text>{`(Ahorro estimado: ${saving})`}</Text>
            <Text>Gastos de envío calculados más adelante.</Text>
            <Space h="xl" />
          </Card>
        </Stack>
      </Grid.Col>
    </Grid>
    </>
  );
};

export default CheckoutTemplate;
