import {
  Paper,
  Divider,
  Text,
  Title,
  Container,
  Space,
  Group,
  Button,
  TextInput,
  LoadingOverlay,
  Center,
  Stack,
  Burger,
  MediaQuery,
} from "@mantine/core";
import { OrderReport } from "@interfaces/order";
import SuborderCard from "../components/subordercard";
import { formatDate } from "@modules/common/functions/format-date";
import { orderStatuses } from "@modules/common/types";
import { useOrder } from "@context/order-context";
import { useEffect, useState } from "react";
import InformationBox from "@modules/account/components/information-box";
import { useDisclosure } from "@mantine/hooks";

const SimpleOrderView = ({ orderId }: { orderId: string }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { getOrder } = useOrder();
  const [report, setReport] = useState<OrderReport | null>(null);
  const [loading, setLoading] = useState(false);
  const getOrderReport = async () => {
    setLoading(true);
    const orderReaded = await getOrder(orderId);
    setReport(orderReaded ?? null);
    setLoading(false);
  };

  useEffect(() => {
    getOrderReport();
  }, []);

  if (loading || !report) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <Center w="100%">
      <Stack w="95%">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <div>
            <Burger opened={opened} onClick={toggle} />
            {opened ? (
              <InformationBox withClose={true} onClose={close} />
            ) : (
              <></>
            )}
          </div>
        </MediaQuery>
        <Group position="apart">
          <Title>
            Detalle Pedido
            <Text color="dimmed" component="span" fz={25}>
              {" "}
              #
              {report.order.paymentInfo?.purchaseNumber ??
                report.order.starspurchasenumber ??
                "-"}
            </Text>
          </Title>
          <Button component="a" href="/orders">
            Volver
          </Button>
        </Group>
        <Paper radius="md" py="md" px="xl" withBorder>
          <Text>
            Fecha de Pedido:{" "}
            <Text fw="bold" span>
              {formatDate(report.order.creationDate)}
            </Text>
          </Text>
          <Text>
            N° Pedido:{" "}
            <Text fw="bold" span>
              {report.order.paymentInfo?.purchaseNumber ??
                report.order.starspurchasenumber ??
                "-"}
            </Text>
          </Text>
          <Text>
            Total del Pedido:{" "}
            <Text fw="bold" span>
              {`S/.${report.order.finalTotal.toFixed(2)}`}
            </Text>
          </Text>
          <Space h="xl" />
          <Title order={3}> Envíos </Title>

          <Paper radius="md" py="md" px="xl" withBorder>
            {report.order.suborders.map((suborder, index) => (
              <SuborderCard
                suborder={suborder}
                index={index}
                total={report.order.suborders.length}
                key={index}
              />
            ))}
          </Paper>
          <Space h="xl" />
          <Title order={3}> Información de Pago </Title>
          <Paper radius="md" py="md" px="xl" withBorder>
            <Text fw="bold">
              Estado:{" "}
              <Text fw="normal" span>{`${
                orderStatuses[report.order.status ?? ""]
              }`}</Text>
            </Text>
            <Text fw="bold">
              Comentarios:{" "}
              <Text fw="normal" span>
                {report.order.comments || "-"}
              </Text>
            </Text>
            <Divider mb="sm" />
            <Text fw="bold">
              Método de Pago:{" "}
              <Text fw="normal" span>
                {`Pago ${
                  (report.order.starsUsed ?? 0) > 0
                    ? "con estrellas"
                    : report.order.paymentInfo?.canal
                }`}
              </Text>
            </Text>
            <Text fw="bold">
              Detalle de Pago:{" "}
              <Text fw="normal" span>
                {(report.order.starsUsed ?? 0) > 0
                  ? `${report.order.starsUsed} estrellas`
                  : `${report.order.paymentInfo?.brand} ${report.order.paymentInfo?.card}`}
              </Text>
            </Text>
            <Divider mb="sm" />
            <Title order={4}>Facturación</Title>
            <Group position="apart" grow>
              <TextInput
                label="Comprobante Pago"
                disabled
                value={report.order.details.isbilling ? "Factura" : "Boleta"}
              />
              <TextInput
                label="Nombre Completo / Razón Social"
                disabled
                value={
                  report.order.details.isbilling
                    ? report.order.details.billingInfo?.businessname
                    : `${report.order.details.collaborator?.name} ${report.order.details.collaborator?.lastname}`
                }
              />
            </Group>
            <Group position="apart" grow>
              <TextInput
                label="Tipo Documento"
                disabled
                value={
                  report.order.details.isbilling
                    ? "RUC"
                    : report.order.details.collaborator?.documenttype
                }
              />
              <TextInput
                label="N° Documento"
                disabled
                value={
                  report.order.details.isbilling
                    ? report.order.details.billingInfo?.ruc
                    : report.order.details.collaborator?.documentnumber
                }
              />
            </Group>
            <TextInput
              label="Dirección Facturación"
              disabled
              value={
                report.order.details.isbilling
                  ? report.order.details.billingInfo?.fiscaladdress
                  : ""
              }
            />
          </Paper>
          <Space h="xl" />
          <Title order={3}> Información de Entrega </Title>
          <Paper radius="md" py="md" px="xl" withBorder>
            <Text fw="bold">Entregar pedido a:</Text>
            <Text>
              {`Nombre Completo: ${
                report.order.details.isreceiver
                  ? report.order.details.deliveryInfo?.receivername || "-"
                  : report.order.details.collaborator?.name +
                    " " +
                    report.order.details.collaborator?.lastname
              }`}
            </Text>
            <Text>
              {`Tipo de Documento: ${
                report.order.details.isreceiver
                  ? report.order.details.deliveryInfo?.receiverdocumentkind ||
                    "-"
                  : report.order.details.collaborator?.documenttype
              }`}
            </Text>
            <Text>
              {`N° Documento: ${
                report.order.details.isreceiver
                  ? report.order.details.deliveryInfo?.receiverdocumentnumber ||
                    "-"
                  : report.order.details.collaborator?.documentnumber
              }`}
            </Text>
            <Text>
              {`Teléfono de Contacto: ${
                report.order.details.isreceiver
                  ? report.order.details.deliveryInfo?.phone || "-"
                  : report.order.details.billingInfo?.phone
              }`}
            </Text>
          </Paper>
          <Space h="xl" />
          <Title order={3}> Resumen del Pedido </Title>
          <Paper radius="md" py="md" px="xl" withBorder>
            <Text>{`Sub total: S/.${report.order.totalIgv.toFixed(2)}`}</Text>
            <Text>{`Envío: S/.${(report.order.deliveryPrice || 0).toFixed(
              2
            )}`}</Text>
            <Text fw="bold">{`Total del Pedido: S/.${report.order.finalTotal.toFixed(
              2
            )}`}</Text>
          </Paper>
        </Paper>
      </Stack>
    </Center>
  );
};

export default SimpleOrderView;
