import { useCart } from "@context/cart-context";
import { Grid, Divider, Stack, Title, Card, Group, Text } from "@mantine/core";
import EmptyCart from "../components/empty-cart";
import CheckoutForm from "./checkout-form";

const CheckoutTemplate = ()  => {
    const { cart } = useCart();

    if (!cart) {
      return (
          <EmptyCart />
      );
    }
  
    if (cart.suborders.length == 0) {
      return (
          <EmptyCart />
      );
    }
    return (
        <Grid w="100%" mt={20}>
          <Grid.Col span="auto" px="xl">
            <CheckoutForm />
          </Grid.Col>
          <Divider size="sm" orientation="vertical" />
          <Grid.Col span={3}>
            <Stack w="100%" align="flex-start">
              <Title>Resumen de la orden</Title>
              <Card w="100%" shadow="sm" p="lg" radius="md" withBorder>
                <Group position="apart">
                  <Text>Subtotal:</Text>
                  <Text c="blue" fw={500}>
                    S/.{cart?.total}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text>IGV(18%):</Text>
                  <Text c="blue" fw={500}>
                    S/.{(0.18 * (cart.total ?? 0)).toFixed(2)}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text>Envío:</Text>
                  <Text c="blue" fw={500}>
                    S/.1.00
                  </Text>
                </Group>
                <Divider />
                <Group position="right">
                  <Text c="blue" fw={700}>
                    S/.
                    {(1.18 * (cart.total ?? 0)).toFixed(2)}
                  </Text>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
    );
  
}

export default CheckoutTemplate