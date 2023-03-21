import {
  createStyles,
  Text,
  Card,
  Group,
  CardSection,
  Badge,
  Image,
  ActionIcon,
  NumberInput,
  Button,
  NumberInputHandlers,
  Stack,
  Flex,
  Title,
  Divider,
  Space,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import { useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import { Product } from "@interfaces/productInterface";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export function DetailedProduct({ product }: { product: Product }) {
  const firstVariant = product.variant.at(0);
  if (!firstVariant) {
    return <></>;
  }
  const { classes } = useStyles();
  const [imgIdx, setIdx] = useState(0);
  const [value, setValue] = useState(0);
  const { editProduct } = useCart();
  const handlers = useRef<NumberInputHandlers>();
  const allImages = product.variant.map((variant) => variant.imageURL);

  // Calculo de precio final
  let discount =
    ((firstVariant.refPrice - firstVariant.adflyPrice) /
      firstVariant.refPrice) *
    100;
  let ahorro = firstVariant.refPrice - firstVariant.adflyPrice;

  return (
    <Card withBorder py="xl" px="xl" radius="md" className={classes.card}>
      <CardSection inheritPadding withBorder py="xs">
        <Breadcrumbs separator="→">
          <Anchor fw={500} color="dark" href={"/home"}>
            Inicio
          </Anchor>
          <Anchor fw={500} color="dark" href={"/home"}>
            {product.brand.name}
          </Anchor>
          <Text>{product.productName}</Text>
        </Breadcrumbs>
      </CardSection>

      <CardSection inheritPadding py="xl">
        <Group align="start" position="apart" grow>
          <Stack spacing="xs">
            <div style={{ width: 70 }}>
              <Badge size="lg" color="red" radius="xs" variant="filled">
                -{discount.toFixed(2)}%
              </Badge>
            </div>
            <Space h="lg" />
            <Image
              src={allImages[imgIdx]}
              alt={allImages[imgIdx]}
              height={200}
              fit="contain"
              withPlaceholder
            />
            <Flex>
              {allImages.map((img, idx) => (
                <Image
                  onClick={() => setIdx(idx)}
                  key={idx}
                  src={img}
                  alt={img}
                  height={100}
                  fit="contain"
                  withPlaceholder
                />
              ))}
            </Flex>
          </Stack>
          <Stack spacing="xs">
            <Title order={1}>{product.productName}</Title>
            <Text fw={500}>Marca: {product.brand.name}</Text>
            <Group>
              <Text c="dimmed" fw={100} fz="sm" td="line-through">
                S/. {firstVariant.refPrice}
              </Text>
              <Text c="red" fw={700}>
                S/. {firstVariant.adflyPrice}
              </Text>
            </Group>
            <Text fw={450}>o 5 estrellas ⭐</Text>
            <Text fz="xs">(Ahorro estimado S/. {ahorro})</Text>
            <Divider my="sm" />
            <Text>
              Vendido por{" "}
              <Text span fw={500} inherit>
                Partner
              </Text>
            </Text>
            <Divider my="sm" />
            <Text fz="xs">Stock: {firstVariant.stock} Unidad(es)</Text>
            <Text fz="xs">Fecha de Vencimiento: null</Text>
            <Group spacing={5}>
              <ActionIcon
                size={36}
                variant="default"
                onClick={() => handlers.current?.decrement()}
              >
                <IconCircleMinus stroke={1.5} size={34} />
              </ActionIcon>
              <NumberInput
                hideControls
                value={value}
                onChange={(val: number) => setValue(val)}
                handlersRef={handlers}
                max={10}
                min={0}
                step={1}
                styles={{ input: { width: 70, textAlign: "center" } }}
              />
              <ActionIcon
                size={36}
                variant="default"
                onClick={() => handlers.current?.increment()}
              >
                <IconCirclePlus stroke={1.5} size={34} />
              </ActionIcon>
              <Space />
              <Text fz="xs" c="dimmed">
                Máximo: x unidades este mes.
              </Text>
            </Group>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={() => (value == 0 ? null : editProduct(product, value))}
            >
              Agregar
            </Button>
          </Stack>
        </Group>
      </CardSection>

      <CardSection inheritPadding withBorder py="xs">
        <Text>Detalles del Producto</Text>
        <Text>{product.description}</Text>
      </CardSection>
    </Card>
  );
}
