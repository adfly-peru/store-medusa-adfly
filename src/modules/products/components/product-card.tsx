import {
  Card,
  Group,
  Text,
  ActionIcon,
  Image,
  Badge,
  Button,
  createStyles,
  NumberInput,
  NumberInputHandlers,
  Title,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import { Product } from "@interfaces/productInterface";
import { CartItem } from "@interfaces/cart";

const useStyles = createStyles((theme) => ({
  card: {
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  info: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ProductCard = ({ product }: { product: Product }) => {
  const { classes } = useStyles();
  const [selectedVariant, _] = useState(product.variant[0]);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const handlers = useRef<NumberInputHandlers>();
  const { addProduct, editProduct, removeProduct, getProductById, cart } =
    useCart();
  const setZero = () => {
    if (cartItem) {
      removeProduct(cartItem.uuidcartitem, product.business.uuidbusiness);
    }
  };

  let discount =
    ((selectedVariant.refPrice - selectedVariant.adflyPrice) /
      selectedVariant.refPrice) *
    100;
  let ahorro = (selectedVariant.refPrice - selectedVariant.adflyPrice).toFixed(
    2
  );

  useEffect(() => {
    if (!cart) return;
    const itemGetted = getProductById(
      product.uuidProduct,
      product.business.uuidbusiness
    );
    if (itemGetted) {
      setCartItem(itemGetted);
    } else {
      setCartItem(null);
    }
  }, [cart]);

  if (!selectedVariant) {
    return <></>;
  }

  return (
    <Card
      withBorder
      p="lg"
      shadow="sm"
      radius="md"
      mt={20}
      className={classes.card}
    >
      <Card.Section inheritPadding py="xs">
        <Group position="apart">
          <Badge color="red">-{discount.toFixed(0)}%</Badge>
        </Group>
      </Card.Section>
      <Card.Section p={10} withBorder>
        <Link href={"/product/" + product.uuidProduct}>
          <Image
            src={selectedVariant.imageURL}
            alt={selectedVariant.imageURL}
            height={200}
            fit="contain"
            withPlaceholder
          />
        </Link>
      </Card.Section>
      <Card.Section inheritPadding mt="sm" pb="md" ta="center">
        <Text mt={5}>{product.brand.name}</Text>
        <Title lineClamp={3} fz="xl">
          {product.productName}
        </Title>
        <Group my="xs" position="center">
          <Text fz="sm" td="line-through">
            S/. {selectedVariant.refPrice}
          </Text>
          <Text c="red">S/. {selectedVariant.adflyPrice}</Text>
        </Group>
        {/* <Text fz="sm" c="dimmed">
          (o 5 estrellas)
        </Text> */}
        <Text fz="sm" c="red">
          Ahorro estimado S/. {ahorro}
        </Text>
        {cartItem ? (
          <Group spacing={5} position="center" style={{ marginTop: 15 }}>
            <ActionIcon
              color="gray"
              radius="xl"
              variant="outline"
              onClick={() => handlers.current?.decrement()}
            >
              <IconMinus stroke={1.5} size="1.125rem" />
            </ActionIcon>
            <NumberInput
              hideControls
              value={cartItem.quantity}
              onChange={(val: number) =>
                val == 0
                  ? setZero()
                  : editProduct(cartItem, product.business.uuidbusiness, val)
              }
              handlersRef={handlers}
              max={selectedVariant.stock}
              min={0}
              step={1}
              styles={{ input: { width: 70, textAlign: "center" } }}
            />
            <ActionIcon
              color="gray"
              radius="xl"
              variant="outline"
              onClick={() => handlers.current?.increment()}
            >
              <IconPlus stroke={1.5} size="1.125rem" />
            </ActionIcon>
          </Group>
        ) : (
          <Button
            variant="light"
            fullWidth
            radius="md"
            onClick={() => {
              addProduct(
                product.variant.at(0)?.uuidVariant!,
                product.business.uuidbusiness,
                1
              );
            }}
          >
            Agregar
          </Button>
        )}
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
