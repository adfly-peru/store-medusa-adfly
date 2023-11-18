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
  Stack,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import { Offer } from "@interfaces/productInterface";
import { CartItem } from "@interfaces/cart";

const useStyles = createStyles((theme) => ({
  card: {
    border: "1px solid #242529",
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

const ProductCard = ({ product }: { product: Offer }) => {
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
    ((selectedVariant.refPrice -
      ((selectedVariant.offerPrice ?? 0) > 0
        ? selectedVariant.offerPrice ?? 0
        : selectedVariant.adflyPrice)) /
      selectedVariant.refPrice) *
    100;

  useEffect(() => {
    if (!cart) return;
    const itemGetted = getProductById(
      product.uuidOffer,
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
    <Link href={"/product/" + product.uuidOffer}>
      <Card shadow="sm" radius="md" className={classes.card} px="sm" w={272}>
        <Card.Section py="xs" inheritPadding>
          <Group position="right">
            <Badge color="red" variant="filled" radius="sm">
              -
              {product.type === "coupon"
                ? `${
                    selectedVariant.coupon?.discountType === "monetary"
                      ? ` S/.${selectedVariant.coupon.discount.toFixed(2)}`
                      : ` ${selectedVariant.coupon?.discount}%`
                  }`
                : ` ${discount.toFixed(0)}%`}
            </Badge>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding>
          <Image
            src={selectedVariant.imageURL}
            alt={selectedVariant.imageURL}
            height={200}
            fit="contain"
            withPlaceholder
            radius="8px"
            styles={{
              figure: {
                border: "1px solid #737A82",
                borderRadius: "8px",
              },
            }}
          />
        </Card.Section>
        <Card.Section py="xs" inheritPadding ta="left" h={95}>
          <Text lineClamp={1} mt={5}>
            {product.brand.name}
          </Text>
          <Title lineClamp={2} order={3}>
            {product.offerName}
          </Title>
        </Card.Section>
        <Card.Section py="xs" inheritPadding ta="center" h={130}>
          {product.type === "coupon" ? (
            <Stack justify="center" h="100%">
              <Group c="red" position="apart" fw="bold">
                <Text fz="sm">Descuento</Text>
                <Text>
                  -
                  {selectedVariant.coupon?.discountType === "monetary"
                    ? ` S/. ${selectedVariant.coupon?.discount}`
                    : ` ${selectedVariant.coupon?.discount}%`}
                </Text>
              </Group>
            </Stack>
          ) : (
            <Stack justify="center" h="100%" spacing="xs">
              {selectedVariant.offerPrice ? (
                <Group c="red" position="apart" fw="bold">
                  <Text fz="sm">Oferta</Text>
                  <Text>S/. {selectedVariant.offerPrice.toFixed(2)}</Text>
                </Group>
              ) : null}
              <Group position="apart" fw="bold">
                <Text fz="sm">Precio ADFLY</Text>
                <Text td={selectedVariant.offerPrice ? "line-through" : "none"}>
                  S/. {selectedVariant.adflyPrice.toFixed(2)}
                </Text>
              </Group>
              <Group position="apart">
                <Text fz="sm">Precio Mercado</Text>
                <Text td="line-through">
                  S/. {selectedVariant.refPrice.toFixed(2)}
                </Text>
              </Group>
            </Stack>
          )}
        </Card.Section>
        <Card.Section py="xs" inheritPadding ta="center" h={70}>
          <Button fullWidth radius="md">
            {product.type === "coupon" ? "Generar Cupón" : "Agregar"}
          </Button>
        </Card.Section>
      </Card>
    </Link>
  );
};

export default ProductCard;
