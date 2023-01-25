import {
  AppShell,
  Divider,
  Grid,
  Header,
  ScrollArea,
  Stack,
  Title,
  Text,
  Card,
  Button,
  Center,
  Group,
  Space,
  ActionIcon,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconShoppingCart, IconShoppingCartOff } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCart } from "@context/cart-context";
import AuthLayout from "@modules/account/templates/authentication-layout";
import HomeHeader from "@modules/home/components/header";
import ProductCartView from "@modules/my-cart/components/product-cart-view";

const MyCartPage = () => {
  const { products } = useCart();
  const { width, height } = useViewportSize();
  const router = useRouter();
  return (
    <AuthLayout>
      <AppShell
        header={
          <Header height={120} p="xs">
            <HomeHeader />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {products.length == 0 ? (
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
        ) : (
          <Grid mt={20}>
            <Grid.Col span="auto" px="xl">
              <Stack align="flex-start">
                <Title px="sm">Mi Carrito (x Productos)</Title>
                <Divider size="sm" w="100%" color="dark" />
                <ScrollArea
                  h={height / 1.5}
                  w="100%"
                  type="auto"
                  offsetScrollbars
                >
                  {products.map((prod, id): any => (
                    <div key={id}>
                      <ProductCartView productCart={prod} />
                      <Divider />
                    </div>
                  ))}
                </ScrollArea>
              </Stack>
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
        )}
      </AppShell>
    </AuthLayout>
  );
};

export default MyCartPage;
