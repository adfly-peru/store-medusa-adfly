import {
  Image,
  Text,
  Stack,
  Group,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  Grid,
  Title,
  Space,
  List,
  ThemeIcon,
  Divider,
  Button,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleMinus,
  IconCirclePlus,
  IconX,
} from "@tabler/icons";
import { useRef } from "react";
import { ProductCart, useCart } from "@context/cart-context";

const DetailedProductCartView = ({
  productCart,
}: {
  productCart: ProductCart;
}) => {
  const product = productCart.product;
  const firstVariant = product.variant.at(0);
  if (!firstVariant) {
    return <></>;
  }
  const { editProduct, removeProduct } = useCart();
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Grid my={5}>
      <Grid.Col span={3}>
        <Image
          src={firstVariant.imageURL}
          alt={firstVariant.imageURL}
          height={300}
          fit="contain"
          withPlaceholder
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack h="100%" justify="space-around">
          <Group position="apart">
            <Stack>
              <Title order={3}>Nombre</Title>
              <Space h="lg" />
              <Text c="green">Stock disponible</Text>
              <Text>Vendido por Partner</Text>
            </Stack>
            <Stack spacing={0}>
              <Text size="xl">
                <Text fz="md" c="dimmed" span td="line-through" inherit>
                  S/.100
                </Text>{" "}
                S/.80
              </Text>
              <Text c="dimmed">o 800 estrellas</Text>
              <Space h="md" />
              <List
                spacing={2}
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>Envío a domicilio</List.Item>
                <List.Item>Recojo en tienda</List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="red" size={24} radius="xl">
                      <IconX size={16} />
                    </ThemeIcon>
                  }
                >
                  Envío a centro de trabajo
                </List.Item>
              </List>
            </Stack>
          </Group>
          <Group>
            <Group spacing={5}>
              <ActionIcon
                color="dark"
                size={42}
                onClick={() => handlers.current?.decrement()}
              >
                <IconCircleMinus stroke={1.5} size={34} />
              </ActionIcon>
              <NumberInput
                hideControls
                value={productCart.quantity}
                onChange={(val) => editProduct(product, val ?? 0)}
                handlersRef={handlers}
                max={10}
                min={1}
                radius="md"
                styles={{ input: { width: 54, textAlign: "center" } }}
              />
              <ActionIcon
                color="dark"
                size={42}
                onClick={() => handlers.current?.increment()}
              >
                <IconCirclePlus stroke={1.5} size={34} />
              </ActionIcon>
            </Group>

            <Divider size="sm" orientation="vertical" />
            <Button
              color="dark"
              variant="subtle"
              onClick={() => removeProduct(product)}
            >
              Eliminar
            </Button>

            <Divider size="sm" orientation="vertical" />
            <Button color="dark" variant="subtle">
              Guardar para después
            </Button>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default DetailedProductCartView;
