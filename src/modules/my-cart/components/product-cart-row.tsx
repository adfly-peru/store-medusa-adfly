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
  Center,
} from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef } from "react";
import { useCart } from "@context/cart-context";
import { CartItem } from "@interfaces/cart";

const ProductCartRow = ({
  item,
  businessid,
  businessName,
}: {
  item: CartItem;
  businessid: string;
  businessName: string;
}) => {
  const { editProduct, removeProduct } = useCart();
  const handlers = useRef<NumberInputHandlers>();

  return (
    <tr key={item.uuidcartitem} style={{ height: "180px", fontSize: 15 }}>
      <td>
        <Grid>
          <Grid.Col span={3}>
            <Stack align="center" justify="center" h="100%">
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
            <Title fw={600} order={3}>
              {item.variant.offer.offerName}
            </Title>
            ...
            <Text>
              {item.variant.attributes.reduce(
                (p, v, i) =>
                  p +
                  (i === 0
                    ? `${v.attributeName}: ${v.value}`
                    : `; ${v.attributeName}: ${v.value}`),
                ""
              )}
            </Text>
            ...
            <Text>{`Vendido y despachado por ${businessName}`}</Text>
          </Grid.Col>
        </Grid>
      </td>
      <td style={{ textAlign: "center" }}>
        <Stack justify="center" h="100%" spacing="xs">
          <Text td="line-through">S/ {item.variant.refPrice.toFixed(2)}</Text>
          <Text fw={700} td={item.variant.offerPrice ? "line-through" : "none"}>
            S/ {item.variant.adflyPrice.toFixed(2)}
          </Text>
          {item.variant.offerPrice ? (
            <Text fw={700}>S/ {item.variant.offerPrice.toFixed(2)}</Text>
          ) : null}
        </Stack>
      </td>
      <td style={{ textAlign: "center" }}>
        <Stack align="center">
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
              max={item.variant.stock}
              min={0}
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
              disabled={item.quantity === item.variant.stock}
              bg="#31658E"
              radius="sm"
              h={36}
              w={36}
              onClick={() => handlers.current?.increment()}
            >
              <IconPlus color="white" stroke={3} size={30} />
            </ActionIcon>
          </Group>
          <Text fz={10}>{`Máximo ${item.variant.maxQuantity} unidades`}</Text>
        </Stack>
      </td>
      <td
        style={{ textAlign: "center", fontWeight: 700 }}
      >{`S/${item.subtotal.toFixed(2)}`}</td>
      <td>
        <ActionIcon
          onClick={() => removeProduct(item.uuidcartitem, businessid)}
        >
          <IconTrash color="red" />
        </ActionIcon>
      </td>
    </tr>
  );
};

export default ProductCartRow;
