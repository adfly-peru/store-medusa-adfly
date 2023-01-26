import {
  Text,
  Center,
  Space,
  Group,
  Button,
  Grid,
  Stack,
  Title,
  Card,
  Divider,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import Layout from "@modules/layout/templates";
import CheckoutForm from "@modules/checkout/templates/checkout-form";

const CheckoutPage = () => {
  return (
    <Layout>
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
                  S/.47.97
                </Text>
              </Group>
              <Group position="apart">
                <Text>IGV(18%):</Text>
                <Text c="blue" fw={500}>
                  S/.8.63
                </Text>
              </Group>
              <Group position="apart">
                <Text>Envío:</Text>
                <Text c="blue" fw={500}>
                  S/.7.50
                </Text>
              </Group>
              <Divider />
              <Group position="right">
                <Text c="blue" fw={700}>
                  S/.64.10
                </Text>
              </Group>
              <Space h="md" />
              <Center>
                <Button
                  leftIcon={<IconShoppingCart />}
                  variant="light"
                  radius="xs"
                >
                  Finalizar Compra
                </Button>
              </Center>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default CheckoutPage;
