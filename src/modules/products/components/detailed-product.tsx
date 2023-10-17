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
  Table,
  Tabs,
  Grid,
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
import { CartItem } from "@interfaces/cart";

export function DetailedProduct({ product }: { product: Product }) {
  const [details, setDetails] = useState<
    { name: string; value: string | number }[]
  >([]);
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
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const { addProduct, editProduct, removeProduct, getVariantById, cart } =
    useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [thumbnailStartIdx, setThumbnailStartIdx] = useState(0);
  const displayedThumbnails = 3;
  const handlers = useRef<NumberInputHandlers>();
  const allImages = product.variant.map((v) => v.imageURL);
  let discount =
    ((selectedVariant.refPrice - selectedVariant.adflyPrice) /
      selectedVariant.refPrice) *
    100;
  let ahorro = (selectedVariant.refPrice - selectedVariant.adflyPrice).toFixed(
    2
  );

  const setZero = () => {
    if (cartItem) {
      removeProduct(cartItem.uuidcartitem, product.business.uuidbusiness);
    }
  };

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

  useEffect(() => {
    const newDetails = [];
    if (product.condition)
      newDetails.push({
        name: "Condición del Producto",
        value: product.condition === "new" ? "Nuevo" : "Usado",
      });
    if (product.conditionDetails)
      newDetails.push({
        name: "Detalle de la Condición",
        value: product.conditionDetails,
      });
    if (product.productWarranty)
      newDetails.push({
        name: "Garantía del Producto",
        value: product.productWarranty,
      });
    if (product.sellerWarranty)
      newDetails.push({
        name: "Garantía del Vendedor",
        value: product.sellerWarranty,
      });
    if (product.included)
      newDetails.push({
        name: "¿Qué Incluye?",
        value: product.included,
      });
    if (product.specification)
      newDetails.push({
        name: "Especificaciones",
        value: product.specification,
      });
    if (product.width)
      newDetails.push({
        name: "Ancho",
        value: product.width,
      });
    if (product.height)
      newDetails.push({
        name: "Largo",
        value: product.height,
      });
    if (product.weight)
      newDetails.push({
        name: "Alto",
        value: product.weight,
      });
    if (product.length)
      newDetails.push({
        name: "Peso",
        value: product.length,
      });
    setDetails(newDetails);
  }, [product]);

  useEffect(() => {
    if (!cart) return;
    const itemGetted = getVariantById(
      selectedVariant.uuidVariant,
      product.business.uuidbusiness
    );
    if (itemGetted) {
      setCartItem(itemGetted);
    } else {
      setCartItem(null);
    }
  }, [cart]);

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
          <Anchor
            fw={500}
            color="dark"
            href={`/search?data=${product.department.name}`}
          >
            {product.department.name}
          </Anchor>
          <Anchor
            fw={500}
            color="dark"
            href={`/search?data=${product.category.name}`}
          >
            {product.category.name}
          </Anchor>
          <Anchor
            fw={500}
            color="dark"
            href={`/search?data=${product.subCategory.name}`}
          >
            {product.subCategory.name}
          </Anchor>
          <Text>{product.productName}</Text>
        </Breadcrumbs>
      </CardSection>

      <CardSection inheritPadding py="xl">
        <Grid>
          <Grid.Col span={12} md={4}>
            <Stack spacing="xs">
              <div style={{ width: 70 }}>
                <Badge size="lg" color="red" radius="xs" variant="filled">
                  -{discount.toFixed(0)}%
                </Badge>
              </div>
              <Space h="lg" />
              <Image
                height={300}
                src={allImages[imgIdx]}
                alt={allImages[imgIdx]}
                fit="contain"
                withPlaceholder
              />
              {/* <Flex align="center">
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
              </Flex> */}
            </Stack>
            <Divider orientation="vertical" size="xs" />
          </Grid.Col>
          <Grid.Col span={8} md={5}>
            <Stack spacing="xs">
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
              <Text fz="xs">(Ahorro estimado S/. {ahorro})</Text>
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
                        (attr) =>
                          attr.attributeName === productAttr.attributeName
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
                      data={validValues.map((value) => ({
                        value,
                        label: value,
                      }))}
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
              <Group spacing={5}>
                {cartItem ? (
                  <Group
                    spacing={5}
                    position="center"
                    style={{ marginTop: 15 }}
                  >
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
                          : editProduct(
                              cartItem,
                              product.business.uuidbusiness,
                              val
                            )
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
                      disabled={cartItem.quantity >= cartItem.variant.stock}
                    >
                      <IconPlus stroke={1.5} size="1.125rem" />
                    </ActionIcon>
                  </Group>
                ) : (
                  <Button
                    variant="light"
                    radius="md"
                    onClick={() => {
                      addProduct(
                        selectedVariant.uuidVariant,
                        product.business.uuidbusiness,
                        1
                      );
                    }}
                  >
                    Agregar
                  </Button>
                )}
                <Space />
                <Text fz="xs" c="dimmed">
                  Máximo: {selectedVariant.maxQuantity} unidades este mes.
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={4} md={3}>
            <Stack>
              <Center>
                <Card w={200} shadow="sm" p="lg" radius="sm" withBorder>
                  <Text>
                    <Text span fw="bold">
                      Vendido y despachado por:
                    </Text>
                    {` ${product.business.commercialname}`}
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
                  </List>
                </Card>
              </Center>
            </Stack>
          </Grid.Col>
        </Grid>
      </CardSection>
      <CardSection inheritPadding withBorder py="xs">
        <Tabs defaultValue="description">
          <Tabs.List grow position="apart">
            <Tabs.Tab value="description">Descripción</Tabs.Tab>
            <Tabs.Tab value="details">Información Adicional</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="description" pt="xs">
            {product.description}
          </Tabs.Panel>
          <Tabs.Panel value="details" pt="xs" px="md">
            <Table striped highlightOnHover withBorder withColumnBorders>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                {details.map((d, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Text fw="bold">{d.name}</Text>{" "}
                      </td>
                      <td>{d.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </CardSection>
    </Card>
  );
}
