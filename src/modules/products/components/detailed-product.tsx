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
  UnstyledButton,
  MediaQuery,
  Select,
  Modal,
  CopyButton,
  rem,
  Accordion,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconBuildingStore,
  IconCheck,
  IconChevronRight,
  IconDatabase,
  IconHome,
  IconMail,
  IconMinus,
  IconMoodSad,
  IconPlus,
  IconShoppingCartCheck,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@context/cart-context";
import { Offer, Variant } from "@interfaces/productInterface";
import { CartItem } from "@interfaces/cart";
import { CouponResponse } from "api/cart";

export function DetailedProduct({ product }: { product: Offer }) {
  const [details, setDetails] = useState<{ name: string; value: string }[]>([]);
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
  const [loading, setLoading] = useState(false);
  const [filteredVariants, setFilteredVariants] = useState<Variant[]>([]);
  const [opened, setOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variant[0]);
  const [value, setValue] = useState<number>(0);
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [maxUnits, setMaxUnits] = useState(product.variant[0].maxQuantity);
  const [couponReponse, setCouponResponse] = useState<CouponResponse | null>(
    null
  );
  const { addProduct, getVariantById, cart, generateCoupon } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [thumbnailStartIdx, setThumbnailStartIdx] = useState(0);
  const displayedThumbnails = 3;
  const handlers = useRef<NumberInputHandlers>();
  const allImages = product.variant.map((v) => v.imageURL);
  let discount =
    ((selectedVariant.refPrice -
      (selectedVariant.offerPrice ?? selectedVariant.adflyPrice)) /
      selectedVariant.refPrice) *
    100;

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
    const matchingVariantIndex = filteredVariants.findIndex((variant) =>
      variant.attributes.every(
        (attr) => attributeSelections[attr.attributeName] === attr.value
      )
    );

    if (matchingVariantIndex > -1) {
      setSelectedVariant(filteredVariants[matchingVariantIndex]);
      setImgIdx(matchingVariantIndex);
    }
  }, [attributeSelections, filteredVariants]);

  useEffect(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    switch (product.type) {
      case "coupon":
        if (selectedVariant.coupon?.initialDate)
          newDetails.push({
            name: "Fecha Inicio Uso",
            value: new Date(selectedVariant.coupon?.initialDate).toLocaleString(
              "es-ES",
              dateOptions
            ),
          });
        if (selectedVariant.coupon?.expirationDate)
          newDetails.push({
            name: "Fecha Vencimiento Uso",
            value: new Date(
              selectedVariant.coupon?.expirationDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.initialPurchaseDate)
          newDetails.push({
            name: "Fecha Inicio Compra",
            value: new Date(
              selectedVariant.coupon?.initialPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.expirationPurchaseDate)
          newDetails.push({
            name: "Fecha Vencimiento Compra",
            value: new Date(
              selectedVariant.coupon?.expirationPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.coupon?.couponUsage)
          newDetails.push({
            name: "¿Cómo usar el cupón?",
            value: selectedVariant.coupon?.couponUsage,
          });
        if (selectedVariant.coupon?.couponContent)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.coupon?.couponContent,
          });
        break;
      case "service":
        if (selectedVariant.service?.initialDate)
          newDetails.push({
            name: "Fecha Inicio Uso",
            value: new Date(
              selectedVariant.service?.initialDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.expirationDate)
          newDetails.push({
            name: "Fecha Vencimiento Uso",
            value: new Date(
              selectedVariant.service?.expirationDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.initialPurchaseDate)
          newDetails.push({
            name: "Fecha Inicio Compra",
            value: new Date(
              selectedVariant.service?.initialPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.expirationPurchaseDate)
          newDetails.push({
            name: "Fecha Vencimiento Compra",
            value: new Date(
              selectedVariant.service?.expirationPurchaseDate
            ).toLocaleString("es-ES", dateOptions),
          });
        if (selectedVariant.service?.accessService)
          newDetails.push({
            name: "¿Cómo acceder al servicio?",
            value: selectedVariant.service?.accessService,
          });
        if (selectedVariant.service?.contentService)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.service?.contentService,
          });
        break;
      case "product":
        if (selectedVariant.product?.specification)
          newDetails.push({
            name: "Especificaciones del Producto",
            value: selectedVariant.product.specification,
          });
        if (selectedVariant.product?.condition)
          newDetails.push({
            name: "Condición del Producto",
            value:
              selectedVariant.product.condition === "new" ? "Nuevo" : "Usado",
          });
        if (selectedVariant.product?.conditionDetails)
          newDetails.push({
            name: "Detalle de la Condición",
            value: selectedVariant.product.conditionDetails,
          });
        if (selectedVariant.product?.productWarranty)
          newDetails.push({
            name: "Garantía del Producto",
            value: selectedVariant.product?.productWarranty,
          });
        if (selectedVariant.product?.sellerWarranty)
          newDetails.push({
            name: "Garantía del Vendedor",
            value: selectedVariant.product?.sellerWarranty,
          });
        if (selectedVariant.product?.included)
          newDetails.push({
            name: "¿Qué incluye?",
            value: selectedVariant.product?.included,
          });
        if (selectedVariant.product?.width)
          newDetails.push({
            name: "Ancho (cm)",
            value: `${selectedVariant.product?.width}`,
          });
        if (selectedVariant.product?.length)
          newDetails.push({
            name: "Largo (cm)",
            value: `${selectedVariant.product?.length}`,
          });
        if (selectedVariant.product?.height)
          newDetails.push({
            name: "Alto (cm)",
            value: `${selectedVariant.product?.height}`,
          });
        if (selectedVariant.product?.weight)
          newDetails.push({
            name: "Peso (kg)",
            value: `${selectedVariant.product?.weight}`,
          });
        break;
    }
    setDetails(newDetails);
  }, [product]);

  useEffect(() => {
    if (!cart) return;
    const itemGetted = getVariantById(
      selectedVariant.uuidVariant,
      product.business.uuidbusiness
    );
    if (itemGetted) {
      const allowed = selectedVariant.maxQuantity - itemGetted.quantity;
      setMaxUnits(
        allowed < selectedVariant.stock ? allowed : selectedVariant.stock
      );
      setCartItem(itemGetted);
    } else {
      setMaxUnits(
        selectedVariant.maxQuantity < selectedVariant.stock
          ? selectedVariant.maxQuantity
          : selectedVariant.stock
      );
      setCartItem(null);
    }
  }, [cart, selectedVariant]);

  useEffect(() => {
    const uniqueAttributes = new Set();
    const uniqueVariants = product.variant.filter((variant) => {
      const attributesString = JSON.stringify(
        variant.attributes.sort((a, b) =>
          a.attributeName.localeCompare(b.attributeName)
        )
      );
      if (!uniqueAttributes.has(attributesString)) {
        uniqueAttributes.add(attributesString);
        return true;
      }
      return false;
    });
    setFilteredVariants(uniqueVariants);
    setSelectedVariant(uniqueVariants[0]);
  }, [product.variant]);

  if (!selectedVariant) {
    return null;
  }

  return (
    <Card py="xl" radius="md">
      <LoadingOverlay overlayBlur={2} overlayOpacity={0.9} visible={loading} />
      <Modal opened={opened} onClose={() => setOpen(false)}>
        {couponReponse?.status === "success" ? (
          <Stack>
            <Title order={3} fz={16}>
              ¡Felicitaciones, tu cupón de descuento se ha generado con éxito!
            </Title>
            <Group
              h={59}
              position="apart"
              bg="#E3E4E6"
              style={{
                border: "1px solid #737A82",
                borderRadius: "0.5rem",
                fontSize: 20,
              }}
            >
              <Text fw={700} ml="lg">
                {couponReponse?.couponCode ?? "aaaaaaaaaa"}
              </Text>
              <CopyButton value="https://mantine.dev">
                {({ copied, copy }) => (
                  <Button
                    h="100%"
                    w={146}
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                    fz={16}
                  >
                    {copied ? "Listo" : "Copiar"}
                  </Button>
                )}
              </CopyButton>
            </Group>
          </Stack>
        ) : (
          <Stack align="center">
            <Text fw={700}>Ocurrió un error inesperado</Text>
            <IconMoodSad size={100} />
          </Stack>
        )}
      </Modal>
      <CardSection inheritPadding py="xs">
        <Breadcrumbs separator={<IconChevronRight size={18} />}>
          <UnstyledButton
            c="#5C6268"
            fw={400}
            fz={12}
            component="a"
            href={"/home"}
          >
            <Group spacing="xs">
              <IconHome size={18} />
              <MediaQuery
                smallerThan="sm"
                styles={{
                  display: "none",
                }}
              >
                <Text>Inicio</Text>
              </MediaQuery>
            </Group>
          </UnstyledButton>
          <UnstyledButton
            c="#5C6268"
            fw={400}
            fz={12}
            component="a"
            href={`/search?data=${product.department.name}`}
          >
            {product.department.name}
          </UnstyledButton>
          <UnstyledButton
            c="#5C6268"
            fw={400}
            fz={12}
            component="a"
            href={`/search?data=${product.category.name}`}
          >
            {product.category.name}
          </UnstyledButton>
          <UnstyledButton
            c="#5C6268"
            fw={400}
            fz={12}
            component="a"
            href={`/search?data=${product.subCategory.name}`}
          >
            {product.subCategory.name}
          </UnstyledButton>
          <Text c="#5C6268" fw={400} fz={12}>
            {product.offerName}
          </Text>
        </Breadcrumbs>
      </CardSection>

      <CardSection inheritPadding py="xl">
        <Grid>
          <MediaQuery
            largerThan="md"
            styles={{
              display: "none",
            }}
          >
            <Stack w="90%" spacing="xs">
              <Group position="apart">
                <Text fw={700}>{product.brand.name}</Text>
                <Text>
                  <Text span fw="bold">
                    SKU:
                  </Text>
                  {product.principalSku}
                </Text>
              </Group>
              <Title fw={500} order={2} lineClamp={2}>
                {product.offerName}
              </Title>
            </Stack>
          </MediaQuery>
          <Grid.Col span={12} md="content">
            <MediaQuery
              smallerThan="md"
              styles={{
                width: "100%",
              }}
            >
              <Stack spacing={0} w={370} h={430}>
                <Group position="right">
                  <Badge color="red" variant="filled" radius="sm">
                    -
                    {product.type === "coupon"
                      ? `${
                          selectedVariant.coupon?.discountType === "monetary"
                            ? ` S/.${selectedVariant.coupon.discount.toFixed(
                                2
                              )}`
                            : ` ${selectedVariant.coupon?.discount}%`
                        }`
                      : ` ${discount.toFixed(0)}%`}
                  </Badge>
                </Group>
                <Space h="lg" />
                <Image
                  width="100%"
                  height={390}
                  src={
                    allImages[imgIdx] ??
                    "https://cdn-icons-png.flaticon.com/512/3770/3770820.png"
                  }
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
            </MediaQuery>
          </Grid.Col>
          <Grid.Col span={12} md="auto">
            <Stack spacing="xs">
              <MediaQuery
                smallerThan="md"
                styles={{
                  display: "none",
                }}
              >
                <div>
                  <Text fw={700}>{product.brand.name}</Text>
                  <Title fw={500} order={2}>
                    {product.offerName}
                  </Title>
                </div>
              </MediaQuery>
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
                    <Text
                      td={selectedVariant.offerPrice ? "line-through" : "none"}
                    >
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
              {filteredVariants.length > 1 ? <Divider my="sm" /> : null}
              {product.offerAttributes.map((productAttr, index) => {
                const validVariants = filteredVariants.filter((variant) =>
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
                    <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                      <Group position="apart">
                        <Text>
                          <Text span fw="bold">
                            {productAttr.attribute.attributeName}
                          </Text>
                        </Text>
                        <Select
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
                      </Group>
                    </MediaQuery>
                    <MediaQuery largerThan="md" styles={{ display: "none" }}>
                      <Select
                        data={validValues.map((value) => ({
                          value,
                          label: value,
                        }))}
                        value={
                          attributeSelections[
                            productAttr.attribute.attributeName
                          ] || ""
                        }
                        label={productAttr.attribute.attributeName}
                        onChange={(val) =>
                          handleAttributeSelection(
                            productAttr.attribute.attributeName,
                            val ?? ""
                          )
                        }
                      />
                    </MediaQuery>
                  </div>
                );
              })}
              <Divider my="sm" />
              <Text fz="xs">
                <Text span fw="bold">
                  - Stock:
                </Text>
                {` ${selectedVariant.stock} unidad(es)`}
              </Text>
              <Text fz="xs">
                <Text span fw="bold">
                  - Máximo pedido:
                </Text>
                {` ${selectedVariant.maxQuantity} unidad(es)`}
              </Text>
              {product.type === "coupon" ? (
                <Button
                  radius="md"
                  onClick={async () => {
                    setLoading(true);
                    const response = await generateCoupon(
                      selectedVariant.uuidVariant,
                      product.uuidOffer
                    );
                    setCouponResponse(response ?? null);
                    setOpen(true);
                    setLoading(false);
                  }}
                >
                  Generar Cupón
                </Button>
              ) : (
                <Stack spacing="md">
                  <Group spacing={5} align="center">
                    <Group spacing={5} position="center">
                      <ActionIcon
                        variant="transparent"
                        color="dark"
                        disabled={value === 0}
                        bg="#F2F2F3"
                        radius="md"
                        h={45}
                        w={45}
                        onClick={() => handlers.current?.decrement()}
                      >
                        <IconMinus stroke={1.5} size="1.125rem" />
                      </ActionIcon>
                      <NumberInput
                        hideControls
                        value={value}
                        onChange={(val) => setValue(val === "" ? 0 : val)}
                        handlersRef={handlers}
                        max={maxUnits}
                        min={0}
                        step={1}
                        styles={{
                          input: { width: 45, height: 45, textAlign: "center" },
                        }}
                      />
                      <ActionIcon
                        variant="transparent"
                        color="dark"
                        disabled={value === maxUnits}
                        bg="#F2F2F3"
                        radius="md"
                        h={45}
                        w={45}
                        onClick={() => handlers.current?.increment()}
                      >
                        <IconPlus stroke={1.5} size="1.125rem" />
                      </ActionIcon>
                    </Group>
                    <Space />
                    <Button
                      radius="md"
                      disabled={maxUnits <= 0 || value === 0}
                      onClick={() => {
                        addProduct(
                          selectedVariant.uuidVariant,
                          product.business.uuidbusiness,
                          value
                        );
                      }}
                    >
                      Agregar al carrito
                    </Button>
                  </Group>
                  <Group position="left">
                    <IconShoppingCartCheck />
                    <Text fz={12}>
                      Tu carrito tiene
                      <Text span fw={700}>{` ${
                        cartItem?.quantity ?? 0
                      } unidades `}</Text>
                      de esta oferta.
                    </Text>
                  </Group>
                </Stack>
              )}
            </Stack>
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Grid.Col span="content">
              <Stack w={272}>
                <Center>
                  <Text fz="xs">
                    <Text span fw="bold">
                      SKU:
                    </Text>
                    {product.principalSku}
                  </Text>
                </Center>
                <Center>
                  <Card w={270} shadow="sm" p="lg" radius="sm" withBorder>
                    <Text span fw="bold">
                      Venta y despacho por:
                    </Text>
                    <Text>{` ${product.business.commercialname}`}</Text>
                    {/* TODO: TERMINOS Y CONDICIONES */}
                    {product.type === "coupon" ? null : (
                      <>
                        <Divider my="md" />
                        <Text fw="bold" mb="xs">
                          Entrega disponible:
                        </Text>
                        <List spacing="xs" size="sm" center>
                          <List.Item
                            icon={
                              <IconTruckDelivery
                                color={
                                  product.business.deliveryMethods
                                    .deliveryonhome &&
                                  product.type === "product"
                                    ? undefined
                                    : "#ABAFB4"
                                }
                              />
                            }
                          >
                            <Stack
                              spacing={0}
                              c={
                                product.business.deliveryMethods
                                  .deliveryonhome && product.type === "product"
                                  ? undefined
                                  : "#ABAFB4"
                              }
                            >
                              <Text>Entrega a domicilio</Text>
                              <Text
                                fz={12}
                                c={
                                  product.business.deliveryMethods
                                    .deliveryonhome &&
                                  product.type === "product"
                                    ? "green"
                                    : undefined
                                }
                              >
                                {product.business.deliveryMethods
                                  .deliveryonhome && product.type === "product"
                                  ? "Disponible"
                                  : "No Disponible"}
                              </Text>
                            </Stack>
                          </List.Item>
                          <List.Item
                            icon={
                              <IconBuildingStore
                                color={
                                  product.type === "service"
                                    ? "#ABAFB4"
                                    : undefined
                                }
                              />
                            }
                          >
                            <Stack
                              spacing={0}
                              c={
                                product.type === "service"
                                  ? "#ABAFB4"
                                  : undefined
                              }
                            >
                              <Text>Recojo en tienda</Text>
                              <Text
                                fz={12}
                                c={
                                  product.type === "service"
                                    ? undefined
                                    : "green"
                                }
                              >
                                {product.type === "service"
                                  ? "No Disponible"
                                  : "Disponible"}
                              </Text>
                            </Stack>
                          </List.Item>
                          <List.Item
                            icon={
                              <IconMail
                                color={
                                  product.type === "service"
                                    ? undefined
                                    : "#ABAFB4"
                                }
                              />
                            }
                          >
                            <Stack
                              spacing={0}
                              c={
                                product.type === "service"
                                  ? undefined
                                  : "#ABAFB4"
                              }
                            >
                              <Text>Entrega virtual</Text>
                              <Text
                                fz={12}
                                c={
                                  product.type === "service"
                                    ? "green"
                                    : undefined
                                }
                              >
                                {product.type === "service"
                                  ? "Disponible"
                                  : "No Disponible"}
                              </Text>
                            </Stack>
                          </List.Item>
                        </List>
                        <Divider my="md" />
                        <Text fw="bold" mb="xs">
                          Métodos de pago:
                        </Text>
                        <Group spacing={5}>
                          <Text>{"Pago online con "}</Text>
                          <Image
                            height={13}
                            width="inherit"
                            fit="contain"
                            src="/niubiz.svg"
                          />
                        </Group>
                        <Image
                          height={30}
                          width="inherit"
                          fit="contain"
                          src="/payment-methods.svg"
                        />
                      </>
                    )}
                  </Card>
                </Center>
              </Stack>
            </Grid.Col>
          </MediaQuery>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Grid.Col span={12}>
              <Divider my="sm" />
              <Text span fw="bold">
                Venta y despacho por:
              </Text>
              <Text>{` ${product.business.commercialname}`}</Text>
              <Accordion
                mt="xl"
                styles={{
                  control: {
                    padding: 0,
                  },
                  content: {
                    padding: 0,
                  },
                }}
              >
                <Accordion.Item value="description">
                  <Accordion.Control>Descripción</Accordion.Control>
                  <Accordion.Panel>{product.description}</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="additional">
                  <Accordion.Control>Información Adicional</Accordion.Control>
                  <Accordion.Panel>
                    <Table
                      verticalSpacing="xl"
                      striped
                      highlightOnHover
                      withBorder
                      withColumnBorders
                      style={{
                        borderRadius: "20px",
                      }}
                    >
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {details.map((d, index) => {
                          return (
                            <tr key={index}>
                              <td
                                style={{
                                  width: 140,
                                }}
                              >
                                <Text fw="bold">{d.name}</Text>{" "}
                              </td>
                              <td>{d.value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </CardSection>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <CardSection inheritPadding withBorder py="xs">
          <Tabs
            defaultValue="description"
            styles={(theme) => ({
              tab: {
                "&[data-active]": {
                  borderColor: "#31658E",
                  color: "#31658E",
                },
              },
            })}
          >
            <Tabs.List grow position="apart">
              <Tabs.Tab value="description" fw="bold">
                Descripción
              </Tabs.Tab>
              <Tabs.Tab value="details" fw="bold">
                Información Adicional
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="description" pt="xs">
              {product.description}
            </Tabs.Panel>
            <Tabs.Panel value="details" pt="xs" px="md">
              <Table
                verticalSpacing="xl"
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                style={{
                  borderRadius: "20px",
                }}
              >
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {details.map((d, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{
                            width: 300,
                          }}
                        >
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
      </MediaQuery>
    </Card>
  );
}
