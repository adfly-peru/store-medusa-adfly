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
  Grid,
} from "@mantine/core";
import { ItemDetails, Suborder } from "@interfaces/order";
import { deliveryMethodInfo, suborderStatuses } from "@modules/common/types";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";

const DetailModal = ({ itemdetails }: { itemdetails: ItemDetails }) => {
  const [details, setDetails] = useState<{ name: string; value: string }[]>([]);
  useEffect(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      timeZone: "UTC",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    if (itemdetails.initialdate)
      newDetails.push({
        name: "Fecha Inicio Uso",
        value: new Date(itemdetails.initialdate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (itemdetails.expirationdate)
      newDetails.push({
        name: "Fecha Vencimiento Uso",
        value: new Date(itemdetails.expirationdate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (itemdetails.initialpurchasedate)
      newDetails.push({
        name: "Fecha Inicio Compra",
        value: new Date(itemdetails.initialpurchasedate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (itemdetails.expirationpurchasedate)
      newDetails.push({
        name: "Fecha Vencimiento Compra",
        value: new Date(itemdetails.expirationpurchasedate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (itemdetails.accessservice)
      newDetails.push({
        name: "¿Cómo acceder al servicio?",
        value: itemdetails.accessservice,
      });
    if (itemdetails.contentservice)
      newDetails.push({
        name: "¿Qué incluye?",
        value: itemdetails.contentservice,
      });
    newDetails.push({
      name: "Términos y Condiciones",
      value: itemdetails.termsconditions ?? "-",
    });
    setDetails(newDetails);
  }, [itemdetails]);

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
            <Accordion.Panel
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {itemdetails.description}
            </Accordion.Panel>
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
                        <td>
                          <Text
                            sx={{
                              whiteSpace: "pre-line",
                            }}
                            fw="bold"
                          >
                            {d.value}
                          </Text>
                        </td>
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
            <Tabs.Panel
              value="description"
              pt="xs"
              sx={{
                whiteSpace: "pre-line",
              }}
            >
              {itemdetails.description}
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
                        <td>
                          <Text
                            sx={{
                              whiteSpace: "pre-line",
                            }}
                            fw="bold"
                          >
                            {d.value}
                          </Text>
                        </td>
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
            ? ` (${suborder.details.name})`
            : ""}
        </Text>
      </Text>
      <Text>
        Dirección Entrega:{" "}
        <Text span fw="bold">
          {suborder.details.address || "-"}
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
          {suborder.details.comments || "-"}
        </Text>
      </Text>
      {(suborder.details.discount ?? 0) > 0 && (
        <Text c="red">{`Dscnto por promocion: - S/.${(
          suborder.details.discount ?? 0
        ).toFixed(2)}`}</Text>
      )}
      {suborder.items.map((product, idx) => (
        <div key={idx}>
          <Divider my="sm" />
          <Grid>
            <Grid.Col span={12} sm={6}>
              <Group grow align="flex-start">
                <Stack w={150}>
                  <Image
                    src={product.details.imageurl}
                    alt={product.details.imageurl}
                    height={150}
                    width="100%"
                    fit="contain"
                    withPlaceholder
                  />
                  {product.details?.type === "service" ? (
                    <div>
                      <UnstyledButton
                        onClick={() => {
                          modals.open({
                            title: "Detalles",
                            size: "lg",
                            children: (
                              <DetailModal itemdetails={product.details} />
                            ),
                          });
                        }}
                      >
                        <Text fz={12} c="#31658e">
                          Ver detalle
                        </Text>
                      </UnstyledButton>
                      <Text fz={12}>
                        Código:{" "}
                        {(product.details.servicesCodes ?? []).join(", ")}
                      </Text>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Stack>
                <Stack spacing={0} align="flex-start">
                  <Title order={5} fw="bold" c="indigo" lineClamp={2}>
                    {product.details.productname}
                  </Title>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"SKU: "}
                    </Text>
                    {product.details.variantsku}
                  </Text>
                  <Text fz="sm">
                    <Text fw={500} span>
                      {"Variantes: "}
                    </Text>
                    {product.details.attributes?.map(
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
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <Stack spacing={0} align="center" justify="center" h="100%">
                <Text fw={700}>
                  {`S/.${
                    product.quantity *
                    (product.details.offerprice ?? 0 !== 0
                      ? product.details.offerprice ?? 0
                      : product.details.adflyprice ?? 0)
                  }`}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default SuborderCard;
