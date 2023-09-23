import {
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
  SegmentedControl,
  List,
  Center,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCaretLeft,
  IconCaretRight,
  IconCheck,
  IconMinus,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import { Product } from "@interfaces/productInterface";

export function DetailedProduct({ product }: { product: Product }) {
  const defaultAttributeSelections: Record<string, string> = {};
  if (product.variant[0]) {
    product.variant[0].attributes.forEach((attr) => {
      defaultAttributeSelections[attr.attributeName] = attr.value;
    });
  }
  const [attributeSelections, setAttributeSelections] = useState<
    Record<string, string>
  >(defaultAttributeSelections);

  const handleAttributeSelection = (attributeName: string, value: string) => {
    setAttributeSelections((prev) => ({ ...prev, [attributeName]: value }));
  };
  const [selectedVariant, setSelectedVariant] = useState(product.variant[0]);
  const [imgIdx, setImgIdx] = useState(0);
  const [value, setValue] = useState(0);
  const { addProduct } = useCart();
  const [thumbnailStartIdx, setThumbnailStartIdx] = useState(0);
  const displayedThumbnails = 3;

  const navigateThumbnails = (direction: "left" | "right") => {
    if (direction === "left" && thumbnailStartIdx > 0) {
      setThumbnailStartIdx(thumbnailStartIdx - 1);
    }
    if (
      direction === "right" &&
      thumbnailStartIdx < allImages.length - displayedThumbnails
    ) {
      setThumbnailStartIdx(thumbnailStartIdx + 1);
    }
  };
  const handlers = useRef<NumberInputHandlers>();
  const allImages = product.variant.map((v) => v.imageURL);
  let discount =
    ((selectedVariant.refPrice - selectedVariant.adflyPrice) /
      selectedVariant.refPrice) *
    100;
  let ahorro = (selectedVariant.refPrice - selectedVariant.adflyPrice).toFixed(
    2
  );
  useEffect(() => {
    const matchingVariantIndex = product.variant.findIndex((variant) =>
      variant.attributes.every(
        (attr) => attributeSelections[attr.attributeName] === attr.value
      )
    );

    if (matchingVariantIndex > -1) {
      setSelectedVariant(product.variant[matchingVariantIndex]);
      setImgIdx(matchingVariantIndex);
    }
  }, [attributeSelections, product.variant]);

  if (!selectedVariant) {
    return null;
  }

  return (
    <Card withBorder py="xl" px="xl" radius="md">
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
        <Group align="start" position="apart">
          <Stack spacing="xs" w="35%">
            <div style={{ width: 70 }}>
              <Badge size="lg" color="red" radius="xs" variant="filled">
                -{discount.toFixed(0)}%
              </Badge>
            </div>
            <Space h="lg" />
            <Image
              src={allImages[imgIdx]}
              alt={allImages[imgIdx]}
              fit="contain"
              withPlaceholder
            />
            <Flex align="center">
              <ActionIcon onClick={() => navigateThumbnails("left")}>
                <IconCaretLeft />
              </ActionIcon>
              {allImages
                .slice(
                  thumbnailStartIdx,
                  thumbnailStartIdx + displayedThumbnails
                )
                .map((img, idx) => (
                  <Image
                    onClick={() => setImgIdx(thumbnailStartIdx + idx)}
                    key={thumbnailStartIdx + idx}
                    src={img}
                    alt={img}
                    height={100}
                    fit="contain"
                    withPlaceholder
                  />
                ))}
              <ActionIcon onClick={() => navigateThumbnails("right")}>
                <IconCaretRight />
              </ActionIcon>
            </Flex>
          </Stack>
          <Divider orientation="vertical" size="xs" />
          <Stack spacing="xs" w="40%">
            <Title order={1}>{product.productName}</Title>
            <Text fw={500}>Marca: {product.brand.name}</Text>
            <Group>
              <Text c="dimmed" fw={100} fz="sm" td="line-through">
                S/. {selectedVariant.refPrice}
              </Text>
              <Text c="red" fw={700}>
                S/. {selectedVariant.adflyPrice}
              </Text>
            </Group>
            {/* <Text fw={450}>o 5 estrellas ⭐</Text> */}
            <Text fz="xs">(Ahorro estimado S/. {ahorro})</Text>
            <Text>{selectedVariant.uuidVariant}</Text>
            <Divider my="sm" />
            {product.productAttributes.map((productAttr, index) => {
              const validVariants = product.variant.filter((variant) =>
                Object.entries(attributeSelections).every(
                  ([key, value]) =>
                    key === productAttr.attributeName ||
                    variant.attributes.some(
                      (attr) =>
                        attr.attributeName === key && attr.value === value
                    )
                )
              );
              const validValues = [
                ...validVariants.flatMap((variant) =>
                  variant.attributes
                    .filter(
                      (attr) => attr.attributeName === productAttr.attributeName
                    )
                    .map((attr) => attr.value)
                ),
              ];
              return (
                <div key={index}>
                  <Text>
                    <Text span fw="bold">
                      {productAttr.attribute.attributeName}
                    </Text>
                  </Text>
                  <SegmentedControl
                    data={validValues.map((value) => ({ value, label: value }))}
                    value={
                      attributeSelections[
                        productAttr.attribute.attributeName
                      ] || ""
                    }
                    onChange={(val) =>
                      handleAttributeSelection(
                        productAttr.attribute.attributeName,
                        val ?? ""
                      )
                    }
                  />
                </div>
              );
            })}
            <Divider my="sm" />
            <Text fz="xs">Stock: {selectedVariant.stock} Unidad(es)</Text>
            <Text fz="xs">Fecha de Vencimiento: null</Text>
            <Group spacing={5}>
              <ActionIcon
                radius="xl"
                variant="default"
                onClick={() => handlers.current?.decrement()}
              >
                <IconMinus stroke={1.5} size="1.125rem" />
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
                radius="xl"
                variant="default"
                onClick={() => handlers.current?.increment()}
              >
                <IconPlus stroke={1.5} size="1.125rem" />
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
              onClick={() =>
                value == 0
                  ? null
                  : addProduct(
                      selectedVariant.uuidVariant,
                      product.business.uuidbusiness,
                      value
                    )
              }
            >
              Agregar
            </Button>
          </Stack>
          <Stack w="20%">
            <Center>
              <Card w={200} shadow="sm" p="lg" radius="sm" withBorder>
                <Text>
                  <Text span fw="bold">
                    Vendido y despachado por:
                  </Text>
                  {` ${product.business.businessname}`}
                </Text>
                <Divider my="md" />
                <Text fw="bold" mb="xs">
                  Tipo de Entrega:
                </Text>
                <List spacing="xs" size="sm" center>
                  <List.Item
                    icon={
                      <ThemeIcon
                        color={
                          product.business.deliveryMethods.deliveryonhome
                            ? "green"
                            : "red"
                        }
                        size={18}
                        radius="xl"
                      >
                        {product.business.deliveryMethods.deliveryonhome ? (
                          <IconCheck size="1rem" />
                        ) : (
                          <IconX size="1rem" />
                        )}
                      </ThemeIcon>
                    }
                  >
                    Entrega en domicilio
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
                          product.business.deliveryMethods.deliveryonhome
                            ? "green"
                            : "red"
                        }
                        size={18}
                        radius="xl"
                      >
                        {product.business.deliveryMethods.deliveryonstore ? (
                          <IconCheck size="1rem" />
                        ) : (
                          <IconX size="1rem" />
                        )}
                      </ThemeIcon>
                    }
                  >
                    Entrega en centro de trabajo
                  </List.Item> */}
                </List>
              </Card>
            </Center>
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
