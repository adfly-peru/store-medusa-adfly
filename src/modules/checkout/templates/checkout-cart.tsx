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
} from "@mantine/core";
import CartView from "@modules/my-cart/templates/cart-view";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from "next/router";
import EmptyCart from "../components/empty-cart";
import { useEffect, useState } from "react";

const CheckoutCart = () => {
  const { cart } = useCart();
  const [saving, setSaving] = useState(0);
  const router = useRouter();

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

  useEffect(() => {
    setSaving(calculateTotalRefPrice());
  }, [cart]);

  if (!cart) {
    return <EmptyCart />;
  }

  const GoToPay = () => {
    router.push("/checkout");
  };

  if (cart.suborders.length == 0) {
    return <EmptyCart />;
  }

  return (
    <Grid w="100%" mt={20}>
      <Grid.Col span="auto" px="xl">
        <CartView cart={cart} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack align="flex-start">
          <Title>Resumen de la orden</Title>
          <Card w="90%" shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Text>Subtotal:</Text>
              <Text>
                S/.{cart.total}
                {/* <Text fz="md" c="dimmed" span inherit>
                  (1600 estrellas)
                </Text> */}
              </Text>
            </Group>
            <Group position="apart">
              <Text>Ahorro estimado:</Text>
              <Text>S/.{(saving - cart.total).toFixed(2)}</Text>
            </Group>
            <Space h="md" />
            <Center>
              <Button
                leftIcon={<IconShoppingCart />}
                variant="light"
                radius="xs"
                onClick={GoToPay}
              >
                Finalizar Compra
              </Button>
            </Center>
          </Card>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default CheckoutCart;
