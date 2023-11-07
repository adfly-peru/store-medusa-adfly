import {
  Group,
  Stack,
  Text,
  Image,
  Divider,
  Title,
  UnstyledButton,
  Accordion,
  CardSection,
  MediaQuery,
  Table,
  Tabs,
} from "@mantine/core";
import { Suborder } from "@interfaces/order";
import { deliveryMethodInfo, suborderStatuses } from "@modules/common/types";
import { modals } from "@mantine/modals";
import { Service, VariantDetailed } from "@interfaces/productInterface";
import { useEffect, useState } from "react";

const DetailModal = ({
  service,
  variant,
}: {
  service?: Service;
  variant: VariantDetailed;
}) => {
  const [details, setDetails] = useState<{ name: string; value: string }[]>([]);
  useEffect(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    if (service?.initialDate)
      newDetails.push({
        name: "Fecha Inicio Uso",
        value: new Date(service?.initialDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (service?.expirationDate)
      newDetails.push({
        name: "Fecha Vencimiento Uso",
        value: new Date(service?.expirationDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (service?.initialPurchaseDate)
      newDetails.push({
        name: "Fecha Inicio Compra",
        value: new Date(service?.initialPurchaseDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (service?.expirationPurchaseDate)
      newDetails.push({
        name: "Fecha Vencimiento Compra",
        value: new Date(service?.expirationPurchaseDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (service?.accessService)
      newDetails.push({
        name: "¿Cómo acceder al servicio?",
        value: service?.accessService,
      });
    if (service?.contentService)
      newDetails.push({
        name: "¿Qué incluye?",
        value: service?.contentService,
      });
    setDetails(newDetails);
  }, [service]);

  return (
    <div>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
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
            <Accordion.Panel>{variant?.offer.description}</Accordion.Panel>
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
      </MediaQuery>
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
              {variant?.offer.description}
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
    </div>
  );
};

const SuborderCard = ({
  suborder,
  index,
  total,
}: {
  suborder: Suborder;
  index: number;
  total: number;
}) => {
  return (
    <div>
      <Group align="start" position="apart" mb="sm">
        <Title order={4}>
          Envío {index + 1} de {total} Vendido y entregado por{" "}
          {suborder.sellerName}
        </Title>
        <Text>
          Estado de Entrega:{" "}
          <Text span>{`${suborderStatuses[suborder.status ?? ""]}`}</Text>
        </Text>
      </Group>
      <Text fw="bold">Comentarios: {suborder.comments}</Text>
      <Text>
        Método de Entrega:{" "}
        <Text span fw="bold">
          {deliveryMethodInfo[suborder.deliveryMethod ?? "null"]}
          {suborder.deliveryMethod === "pickup"
            ? ` (${suborder.deliveryAddress?.alias})`
            : ""}
        </Text>
      </Text>
      <Text>
        Dirección Entrega:{" "}
        <Text span fw="bold">
          {suborder.deliveryAddress?.address || "-"}
        </Text>
      </Text>
      <Text>
        Tiempo Entrega:{" "}
        <Text span fw="bold">
          {suborder.deliveryTime || "-"}
        </Text>
      </Text>
      <Text>
        Especificaciones:{" "}
        <Text span fw="bold">
          {suborder.deliveryAddress?.additional || "-"}
        </Text>
      </Text>
      {suborder.items.map((product, idx) => (
        <div key={idx}>
          <Divider my="sm" />
          <Group position="apart" spacing="xl" grow>
            <Group position="left">
              <Stack w={150}>
                <Image
                  src={product.variant.imageURL}
                  alt={product.variant.imageURL}
                  height={150}
                  width="100%"
                  fit="contain"
                  withPlaceholder
                />
                {product.variant.service ? (
                  <div>
                    <UnstyledButton
                      onClick={() => {
                        modals.open({
                          title: "Detalles",
                          size: "lg",
                          children: (
                            <DetailModal
                              service={product.variant.service}
                              variant={product.variant}
                            />
                          ),
                        });
                      }}
                    >
                      <Text fz={12} c="#31658e">
                        Ver detalle
                      </Text>
                    </UnstyledButton>
                    <Text fz={12}>
                      Código: {product.variant.service?.couponCode}
                    </Text>
                  </div>
                ) : (
                  <div></div>
                )}
              </Stack>
              <Stack spacing={0}>
                <Title order={5} fw="bold" c="indigo" lineClamp={2}>
                  {product.variant.offer.offerName}
                </Title>
                <Text fz="sm">
                  <Text fw={500} span>
                    {"SKU: "}
                  </Text>
                  {product.variant.variantSku}
                </Text>
                <Text fz="sm">
                  <Text fw={500} span>
                    {"Variantes: "}
                  </Text>
                  {product.variant.attributes.map(
                    (attr) => `${attr.attributeName} ${attr.value}, `
                  )}
                </Text>
                <Text fz="sm">
                  <Text fw={500} span>
                    {"Cantidad: "}
                  </Text>
                  {product.quantity}
                </Text>
              </Stack>
            </Group>
            <Stack spacing={0}>
              <Text>
                {`S/.${
                  product.quantity *
                  (product.variant.offerPrice ??
                    product.variant.adflyPrice ??
                    0)
                }`}
              </Text>
            </Stack>
          </Group>
        </div>
      ))}
    </div>
  );
};

export default SuborderCard;
