import { useCart } from "@context/cart-context";
import {
  Center,
  Stack,
  ActionIcon,
  Text,
  Button,
  Card,
  Grid,
  Group,
  Space,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import CartView from "@modules/my-cart/templates/cart-view";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons";
import { useRouter } from "next/router";

const CheckoutCart = () => {
  const { products } = useCart();
  const { width, height } = useViewportSize();
  const router = useRouter();
  if (products.length == 0) {
    return (
      <Center h={height / 1.5}>
        <Stack align="center">
          <ActionIcon variant="transparent" disabled size={width / 8}>
            <IconShoppingCartOff size={width / 8} />
          </ActionIcon>
          <Text fw={500} fz={24}>
            Tu carrito está vacío
          </Text>
        </Stack>
      </Center>
    );
  }
  return (
    <Grid w="100%" mt={20}>
      <Grid.Col span="auto" px="xl">
        <CartView products={products} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Stack align="flex-start">
          <Title>Resumen de la orden</Title>
          <Card w="90%" shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart">
              <Text>Subtotal:</Text>
              <Text>
                S/.160{" "}
                <Text fz="md" c="dimmed" span inherit>
                  (1600 estrellas)
                </Text>
              </Text>
            </Group>
            <Group position="apart">
              <Text>Ahorro estimado:</Text>
              <Text>S/.40</Text>
            </Group>
            <Space h="md" />
            <Center>
              <Button
                leftIcon={<IconShoppingCart />}
                variant="light"
                radius="xs"
                onClick={() => router.push("/checkout")}
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
