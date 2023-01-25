import {
  AppShell,
  Header,
  Text,
  Center,
  Stepper,
  Space,
  Container,
  Group,
  Button,
  Grid,
  Stack,
  Title,
  Card,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons";
import { useState } from "react";
import AuthLayout from "@modules/account/templates/authentication-layout";
import InformationForm from "@modules/checkout/components/information-form";
import ShippingInformation from "@modules/checkout/components/shipping-information";
import HomeHeader from "@modules/home/components/header";

const CheckoutPage = () => {
  const { width, height } = useViewportSize();
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
        <Grid mt={20}>
          <Grid.Col span="auto" px="xl">
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
              <Stepper.Step label="Información" allowStepSelect={active > 0}>
                <ScrollArea
                  h={height / 1.5}
                  w="100%"
                  type="auto"
                  offsetScrollbars
                >
                  <InformationForm />
                </ScrollArea>
              </Stepper.Step>
              <Stepper.Step label="Envío" allowStepSelect={active > 1}>
                <ScrollArea
                  h={height / 1.5}
                  w="100%"
                  type="auto"
                  offsetScrollbars
                >
                  <ShippingInformation />
                </ScrollArea>
              </Stepper.Step>
              <Stepper.Step label="Pago" allowStepSelect={active > 2}>
                Step 3 content: Get full access
              </Stepper.Step>
            </Stepper>
            <Group px={70} position="apart" grow mt="xl">
              <Button variant="light" onClick={prevStep}>
                {active == 0 ? "Regresar a Carrito" : "Retroceder"}
              </Button>
              <Button variant="light" onClick={nextStep}>
                Continuar
              </Button>
            </Group>
          </Grid.Col>
          <Divider size="sm" orientation="vertical" />
          <Grid.Col span={3}>
            <Stack align="flex-start">
              <Title>Resumen de la orden</Title>
              <Card w="90%" shadow="sm" p="lg" radius="md" withBorder>
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
      </AppShell>
    </AuthLayout>
  );
};

export default CheckoutPage;
