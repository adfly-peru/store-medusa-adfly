import {
  Group,
  Stack,
  Text,
  Image,
  Title,
  UnstyledButton,
  Accordion,
  CardSection,
  Divider,
  Grid,
  MediaQuery,
  Table,
  Tabs,
} from "@mantine/core";
import { CouponUsage } from "@interfaces/order";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";

const CouponDetailModal = ({ coupon }: { coupon: CouponUsage }) => {
  const [details, setDetails] = useState<{ name: string; value: string }[]>([]);
  useEffect(() => {
    const newDetails: { name: string; value: string }[] = [];
    const dateOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    if (coupon.couponData?.initialDate)
      newDetails.push({
        name: "Fecha Inicio Uso",
        value: new Date(coupon.couponData?.initialDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.expirationDate)
      newDetails.push({
        name: "Fecha Vencimiento Uso",
        value: new Date(coupon.couponData?.expirationDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.initialPurchaseDate)
      newDetails.push({
        name: "Fecha Inicio Compra",
        value: new Date(coupon.couponData?.initialPurchaseDate).toLocaleString(
          "es-ES",
          dateOptions
        ),
      });
    if (coupon.couponData?.expirationPurchaseDate)
      newDetails.push({
        name: "Fecha Vencimiento Compra",
        value: new Date(
          coupon.couponData?.expirationPurchaseDate
        ).toLocaleString("es-ES", dateOptions),
      });
    if (coupon.couponData?.couponUsage)
      newDetails.push({
        name: "¿Cómo usar el cupón?",
        value: coupon.couponData?.couponUsage,
      });
    if (coupon.couponData?.couponContent)
      newDetails.push({
        name: "¿Qué incluye?",
        value: coupon.couponData?.couponContent,
      });
    setDetails(newDetails);
  }, [coupon]);

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
            <Accordion.Panel>
              {coupon.variant?.offer.description}
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
              {coupon.variant?.offer.description}
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

const CouponCard = ({ coupon }: { coupon: CouponUsage }) => {
  return (
    <div>
      <Group position="apart">
        <Group position="left">
          <Stack w={100}>
            <Image
              src={coupon.variant?.imageURL}
              alt={coupon.variant?.imageURL}
              height={100}
              width="100%"
              fit="contain"
              withPlaceholder
            />
            <UnstyledButton
              onClick={() => {
                modals.open({
                  title: "Detalles",
                  size: "lg",
                  children: <CouponDetailModal coupon={coupon} />,
                });
              }}
            >
              <Text fz={12} c="#31658e">
                Ver detalle
              </Text>
            </UnstyledButton>
          </Stack>
          <Stack spacing={0}>
            <Title order={5} fw="bold" c="indigo" lineClamp={2}>
              {coupon.variant?.offer.offerName}
            </Title>
            <Text fz="sm">
              <Text fw={500} span>
                {"SKU: "}
              </Text>
              {coupon.variant?.variantSku}
            </Text>
            <Text fz="sm">
              {coupon.variant?.attributes.map(
                (attr) => `${attr.attributeName} ${attr.value}, `
              )}
            </Text>
          </Stack>
        </Group>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Stack spacing={0}>
            <Text fw={600}>Descuento</Text>
            <Text>
              {`${
                coupon.couponData?.discountType === "monetary"
                  ? ` S/.${coupon.couponData?.discount.toFixed(2)}`
                  : ` ${coupon.couponData?.discount}%`
              }`}
            </Text>
          </Stack>
        </MediaQuery>
      </Group>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Stack spacing={0}>
          <Text fw={600}>Descuento</Text>
          <Text>
            {`${
              coupon.couponData?.discountType === "monetary"
                ? ` S/.${coupon.couponData?.discount.toFixed(2)}`
                : ` ${coupon.couponData?.discount}%`
            }`}
          </Text>
        </Stack>
      </MediaQuery>
    </div>
  );
};

export default CouponCard;
