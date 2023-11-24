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
  Card,
} from "@mantine/core";
import {
  IconCheck,
  IconMinus,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
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
  const [maxUnits, setMaxUnits] = useState(item.variant.maxQuantity);
  const handlers = useRef<NumberInputHandlers>();

  useEffect(() => {
    if (!item) return;
    setMaxUnits(
      (item.variant.maxQuantity ?? 0) - (item.variant.totalLastPeriod ?? 0) <
        item.variant.totalStock
        ? (item.variant.maxQuantity ?? 0) - (item.variant.totalLastPeriod ?? 0)
        : item.variant.totalStock
    );
  }, [item]);

  return (
    <Card w="100%" withBorder radius="xs" fz={12}>
      <Grid align="flex-start">
        <Grid.Col px={0} pt={0} span="auto">
          <Group grow>
            <Grid.Col span="content">
              <Stack align="center" justify="center" h="100%" w={80}>
                <Image
                  src={item.variant.imageURL}
                  alt={item.variant.imageURL}
                  height={80}
                  width={80}
                  fit="contain"
                  withPlaceholder
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span="auto">
              <Title fw={600} order={3} fz={14} lineClamp={2}>
                {item.variant.offer.offerName}
              </Title>
              <Space h="xs" />
              <Text>{`Por ${businessName}`}</Text>
              <Text lineClamp={2}>
                {item.variant.attributes.reduce(
                  (p, v, i) =>
                    p +
                    (i === 0
                      ? `${v.attributeName}: ${v.value}`
                      : `; ${v.attributeName}: ${v.value}`),
                  ""
                )}
              </Text>
            </Grid.Col>
          </Group>
        </Grid.Col>
        <Grid.Col
          p={0}
          span={1}
          style={{
            flex: "revert",
          }}
        >
          <ActionIcon
            onClick={() => removeProduct(item.uuidcartitem, businessid)}
          >
            <IconTrash color="red" />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <Group position="apart">
        <Stack justify="center" h="100%" spacing={0}>
          <Text td="line-through">S/ {item.variant.refPrice.toFixed(2)}</Text>
          <Text fw={700} td={item.variant.offerPrice ? "line-through" : "none"}>
            S/ {item.variant.adflyPrice.toFixed(2)}
          </Text>
          {item.variant.offerPrice ? (
            <Text fw={700}>S/ {item.variant.offerPrice.toFixed(2)}</Text>
          ) : null}
          <Text fw={700}>{`Total: S/${item.subtotal.toFixed(2)}`}</Text>
        </Stack>
        <Stack>
          <Group spacing={5}>
            <ActionIcon
              variant="transparent"
              bg="#31658E"
              radius="sm"
              h={36}
              w={36}
              disabled={item.quantity === 1}
              onClick={() => handlers.current?.decrement()}
            >
              <IconMinus color="white" stroke={3} size={30} />
            </ActionIcon>
            <NumberInput
              hideControls
              value={item.quantity}
              onChange={(val) =>
                editProduct(item, businessid, val == "" ? 0 : val)
              }
              fz={15}
              handlersRef={handlers}
              max={maxUnits}
              min={1}
              step={1}
              w={80}
              height={30}
              styles={{
                input: {
                  border: "0px",
                  backgroundColor: "#F5F5F5",
                  width: 80,
                  height: 30,
                  padding: 0,
                  fontWeight: 700,
                  color: "black",
                  textAlign: "center",
                },
              }}
            />
            <ActionIcon
              variant="transparent"
              disabled={item.quantity === maxUnits}
              bg="#31658E"
              radius="sm"
              h={36}
              w={36}
              onClick={() => handlers.current?.increment()}
            >
              <IconPlus color="white" stroke={3} size={30} />
            </ActionIcon>
          </Group>
          <Text>{`Máximo ${item.variant.maxQuantity} unidades`}</Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default DetailedProductCartView;
