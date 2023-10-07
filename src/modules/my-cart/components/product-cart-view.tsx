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
import { IconCheck, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useRef } from "react";
import { useCart } from "@context/cart-context";
import { CartItem, CartSubOrder } from "@interfaces/cart";

const DetailedProductCartView = ({
  item,
  suborder,
  businessid,
  businessName,
}: {
  item: CartItem;
  suborder: CartSubOrder;
  businessid: string;
  businessName: string;
}) => {
  const { editProduct, removeProduct } = useCart();
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Grid my={5}>
      <Grid.Col span={3}>
        <Image
          src={item.variant.imageURL}
          alt={item.variant.imageURL}
          height={300}
          fit="contain"
          withPlaceholder
        />
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack h="100%" justify="space-around">
          <Group position="apart" grow>
            <Stack>
              <Title order={3}>{item.variant.product.productName}</Title>
              <Space h="lg" />
              <Text c="green">Stock disponible</Text>
              <Text>Vendido por {businessName}</Text>
            </Stack>
            <Stack spacing={0} align="flex-end">
              <Text size="xl">
                <Text fz="md" c="dimmed" span td="line-through" inherit>
                  S/.{item.variant.refPrice}
                </Text>{" "}
                S/.{item.variant.adflyPrice}
              </Text>
              {/* <Text c="dimmed">o 800 estrellas</Text> */}
              <Space h="md" />
              <List spacing={2} size="sm" center>
                <List.Item
                  icon={
                    <ThemeIcon
                      color={
                        suborder.availableDeliveryMethods.onhome
                          ? "green"
                          : "red"
                      }
                      size={18}
                      radius="xl"
                    >
                      {suborder.availableDeliveryMethods.onhome ? (
                        <IconCheck size="1rem" />
                      ) : (
                        <IconX size="1rem" />
                      )}
                    </ThemeIcon>
                  }
                >
                  Envío a domicilio
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="green" size={18} radius="xl">
                      <IconCheck size="1rem" />
                    </ThemeIcon>
                  }
                >
                  Recojo en tienda
                </List.Item>
                {/* <List.Item
                  icon={
                    <ThemeIcon
                      color={
                        suborder.availableDeliveryMethods.onstore
                          ? "green"
                          : "red"
                      }
                      size={18}
                      radius="xl"
                    >
                      {suborder.availableDeliveryMethods.onstore ? (
                        <IconCheck size="1rem" />
                      ) : (
                        <IconX size="1rem" />
                      )}
                    </ThemeIcon>
                  }
                >
                  Envío a centro de trabajo
                </List.Item> */}
              </List>
            </Stack>
          </Group>
          <Group>
            <Group spacing={5}>
              <ActionIcon
                color="dark"
                radius="xl"
                variant="outline"
                onClick={() => handlers.current?.decrement()}
              >
                <IconMinus stroke={1.5} size="1.125rem" />
              </ActionIcon>
              <NumberInput
                hideControls
                value={item.quantity}
                onChange={(val) =>
                  editProduct(item, businessid, val == "" ? 0 : val)
                }
                handlersRef={handlers}
                max={item.variant.stock}
                min={1}
                radius="md"
                styles={{ input: { width: 54, textAlign: "center" } }}
              />
              <ActionIcon
                color="dark"
                radius="xl"
                variant="outline"
                onClick={() => handlers.current?.increment()}
              >
                <IconPlus stroke={1.5} size="1.125rem" />
              </ActionIcon>
            </Group>

            <Divider size="sm" orientation="vertical" />
            <Button
              color="dark"
              variant="subtle"
              onClick={() => removeProduct(item.uuidcartitem, businessid)}
            >
              Eliminar
            </Button>

            {/* <Divider size="sm" orientation="vertical" /> */}
            {/* <Button color="dark" variant="subtle">
              Guardar para después
            </Button> */}
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default DetailedProductCartView;
