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
} from "@mantine/core";
import { IconCirclePlus, IconCircleMinus } from "@tabler/icons";
import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import Product from "@interfaces/productInterface";

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

const CardComponent = ({ product }: { product: Product }) => {
  const { classes } = useStyles();
  const [showBuy, setShowBuy] = useState(false);
  const handlers = useRef<NumberInputHandlers>();
  const { editProduct, getProductById, removeProduct } = useCart();
  const productCart = getProductById(product.id);
  const quantity = productCart?.quantity ?? 0;
  const setZero = () => {
    setShowBuy(false);
    removeProduct(product);
  };

  // Calculo de precio final
  let finalPrice =
    product.originalPrice - (product.originalPrice * product.discount) / 100;
  let ahorro = product.originalPrice - product.finalPrice;

  return (
    <Card
      withBorder
      p="lg"
      shadow="sm"
      radius="md"
      mt={20}
      className={classes.card}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Badge color="red">-{product.discount}%</Badge>
        </Group>
      </Card.Section>
      <Card.Section mt="sm" p={10}>
        <Link href={"/product/" + product.id}>
          <Image
            src={product.imgUrl[0]}
            alt={product.imgUrl[0]}
            height={200}
            fit="contain"
            withPlaceholder
          />
        </Link>
      </Card.Section>
      <Card.Section withBorder inheritPadding mt="sm" pb="md">
        <Text mt={5}>{product.brand}</Text>
        <Text fz="xl" fw={700}>
          {product.name}
        </Text>
        <Group>
          <Text fz="sm" td="line-through">
            S/. {product.originalPrice}
          </Text>
          <Text c="red">S/. {finalPrice}</Text>
        </Group>
        <Text fz="sm" c="dimmed">
          (o {product.stars} estrellas)
        </Text>
        <Text fz="sm" c="red">
          Ahorro estimado S/. {ahorro}
        </Text>
        {showBuy && quantity ? (
          <Group spacing={5} position="center" style={{ marginTop: 15 }}>
            <ActionIcon
              color="gray"
              size={34}
              onClick={() => handlers.current?.decrement()}
            >
              <IconCircleMinus stroke={1.5} size={34} />
            </ActionIcon>
            <NumberInput
              hideControls
              value={quantity}
              onChange={(val: number) =>
                val == 0 ? setZero() : editProduct(product, val)
              }
              handlersRef={handlers}
              max={10}
              min={0}
              step={1}
              styles={{ input: { width: 70, textAlign: "center" } }}
            />
            <ActionIcon
              color="gray"
              size={34}
              onClick={() => handlers.current?.increment()}
            >
              <IconCirclePlus stroke={1.5} size={34} />
            </ActionIcon>
          </Group>
        ) : (
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={() => {
              setShowBuy(true);
              editProduct(product, 1);
            }}
          >
            Agregar
          </Button>
        )}
      </Card.Section>
    </Card>
  );
};

export default CardComponent;
