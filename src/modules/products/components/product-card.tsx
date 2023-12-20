import {
  Card,
  Group,
  Text,
  Image,
  Badge,
  Button,
  createStyles,
  Title,
  Stack,
  Space,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Offer } from "@interfaces/productInterface";

const useStyles = createStyles((theme) => ({
  card: {
    boxShadow: "0px 4px 4px 0px #00000040",
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
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!product.details) return;
    let newDiscount =
      ((product.details.refPrice -
        ((product.details.offerPrice ?? 0) > 0
          ? product.details.offerPrice ?? 0
          : product.details.adflyPrice)) /
        product.details.refPrice) *
      100;
    setDiscount(newDiscount);
  }, [product]);

  if (!product.details) {
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
                    product.details.discountType === "monetary"
                      ? ` S/.${product.details.discount?.toFixed(2)}`
                      : ` ${product.details.discount}%`
                  }`
                : ` ${discount.toFixed(0)}%`}
            </Badge>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding>
          <Image
            src={product.details.imageURL}
            alt={product.details.imageURL}
            height={200}
            fit="contain"
            withPlaceholder
            radius="8px"
          />
        </Card.Section>
        <Card.Section py="xs" inheritPadding ta="left">
          <Stack spacing={32} h={200}>
            <Stack spacing={8} h={80}>
              <Text lineClamp={1} mt={5} fw={700}>
                {product.brand.name}
              </Text>
              <Text lineClamp={2} fw={400}>
                {product.offerName}
              </Text>
            </Stack>
            <Stack>
              {product.type === "coupon" ? (
                <Stack justify="center" h="100%">
                  <Group c="red" position="apart" fw="bold">
                    <Text fz="sm">Descuento</Text>
                    <Text>
                      -
                      {product.details.discountType === "monetary"
                        ? ` S/. ${product.details.discount}`
                        : ` ${product.details.discount}%`}
                    </Text>
                  </Group>
                </Stack>
              ) : (
                <Stack justify="center" h="100%" spacing={0}>
                  {product.details.offerPrice ? (
                    <Group c="red" position="apart" fw="bold">
                      <Text fz="sm">Oferta</Text>
                      <Text>S/. {product.details.offerPrice.toFixed(2)}</Text>
                    </Group>
                  ) : null}
                  <Group position="apart" fw="bold">
                    <Text fz="sm">Precio ADFLY</Text>
                    <Text
                      td={product.details.offerPrice ? "line-through" : "none"}
                    >
                      S/. {product.details.adflyPrice.toFixed(2)}
                    </Text>
                  </Group>
                  <Group position="apart">
                    <Text fz="sm">Precio Mercado</Text>
                    <Text td="line-through">
                      S/. {product.details.refPrice.toFixed(2)}
                    </Text>
                  </Group>
                  <Group position="apart" fw="bold">
                    <Text fz="sm" c="yellow">
                      Estrellas ⭐
                    </Text>
                    <Text>
                      {(
                        ((product.details.offerPrice ?? 0) > 0
                          ? product.details.offerPrice
                          : product.details.adflyPrice) * 100
                      ).toFixed(0)}
                    </Text>
                  </Group>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Card.Section>
        <Card.Section py="xs" inheritPadding ta="center">
          <Button fullWidth radius="md" h={48}>
            {product.type === "coupon" ? "Generar Cupón" : "Agregar"}
          </Button>
        </Card.Section>
      </Card>
    </Link>
  );
};

export default ProductCard;
