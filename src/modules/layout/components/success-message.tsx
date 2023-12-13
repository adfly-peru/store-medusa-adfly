import {
  Stack,
  Title,
  Group,
  Button,
  Text,
  LoadingOverlay,
  Divider,
  Paper,
  Space,
  TextInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconLocation,
} from "@tabler/icons-react";
import { useAccount } from "@context/account-context";
import { useOrder } from "@context/order-context";
import { OrderReport } from "@interfaces/order";
import { useState, useEffect } from "react";
import { orderStatuses } from "@modules/common/types";
import SuborderCard from "@modules/order/components/subordercard";
import * as amplitude from "@amplitude/analytics-browser";

function formatarFecha(fechaStr: string): string {
  if (fechaStr?.length !== 12) {
    return "-";
    throw new Error("Formato de fecha no válido.");
  }

  const año = "20" + fechaStr.substr(0, 2);
  const mes = fechaStr.substr(2, 2);
  const dia = fechaStr.substr(4, 2);
  const hora = fechaStr.substr(6, 2);
  const minuto = fechaStr.substr(8, 2);
  const segundo = fechaStr.substr(10, 2);

  const fecha = new Date(
    parseInt(año),
    parseInt(mes) - 1, // Los meses en JavaScript empiezan desde 0
    parseInt(dia),
    parseInt(hora),
    parseInt(minuto),
    parseInt(segundo)
  );

  return fecha.toLocaleString(); // Retorna en formato 'dd/mm/yyyy, hh:mm:ss AM/PM'
}

const SuccessMessage = ({
  number,
  id,
  niubizData,
}: {
  number: string[] | string | undefined;
  id: string[] | string | undefined;
  niubizData: any;
}) => {
  const { collaborator } = useAccount();
  const { getOrder } = useOrder();
  const [report, setReport] = useState<OrderReport | null>(null);
  const [loading, setLoading] = useState(false);
  const getOrderReport = async () => {
    setLoading(true);
    const orderReaded = await getOrder(id as string);
    setReport(orderReaded ?? null);
    setLoading(false);
  };

  useEffect(() => {
    getOrderReport();
    amplitude.track("Order Procesada", {
      purchaseNumber: number,
      id,
      ...niubizData,
    });
  }, []);

  if (loading || !report) {
    return <LoadingOverlay visible={loading} />;
  }

  return (
    <Stack align="center" spacing="xs" mx="lg">
      <Paper bg="#F2F2F3" p="xl" fz={15}>
        <Stack>
          <Title fz={25} fw={700}>{`¡Pedido Recibido! - # ${number}`}</Title>
          <Text>
            <Text span c="blue">
              {collaborator?.name ?? ""}
            </Text>
            , gracias por tu pedido.
          </Text>
          <Text>
            Hemos recibido tu pedido N°{" "}
            <Text span c="blue">
              {number}
            </Text>
            . El detalle de tu pedido ha sido enviado a{" "}
            <Text span c="blue">
              {collaborator?.email}
            </Text>
            .
          </Text>
          <Text>
            Estamos procesando tu pedido. Recibirás un correo de confirmación
            una vez confirmado el pedido.
          </Text>
        </Stack>
      </Paper>
      <Group position="center">
        <Button component="a" href="/home" leftIcon={<IconChevronLeft />}>
          Regresar a la Tienda
        </Button>
        <Button
          component="a"
          href={`/orders/${id}`}
          leftIcon={<IconLocation />}
          variant="outline"
          styles={{
            root: {
              borderColor: "#31658E",
              color: "#31658E",
            },
          }}
        >
          Seguir mi Pedido
        </Button>
      </Group>
      <Space />
      <Group w="100%" position="left">
        <Title fw={600} fz={20}>
          Detalle Pedido
          <Text color="dimmed" component="span">
            {" "}
            #{report.order.paymentInfo.purchaseNumber}
          </Text>
        </Title>
      </Group>
      <Paper w="100%" radius="md" py="md" px="xl" fz={15} withBorder>
        <Group spacing="lg">
          <Stack spacing="xs">
            <Text>Fecha de Pedido:</Text>
            <Text>N° Pedido: </Text>
            <Text>Total del Pedido:</Text>
          </Stack>
          <Stack spacing="xs">
            <Text fw="bold" span>
              {formatarFecha(niubizData?.order?.transactionDate)}
            </Text>
            <Text fw="bold" span>
              {report.order.paymentInfo.purchaseNumber}
            </Text>
            <Text fw="bold" span>
              {`${niubizData?.order?.amount?.toFixed(2)} ${
                niubizData?.order?.currency
              }`}
            </Text>
          </Stack>
        </Group>
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
            Estado de Entrega:{" "}
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
              {`Pago ${report.order.paymentInfo.canal || "-"}`}
            </Text>
          </Text>
          <Text fw="bold">
            Detalle de Pago:{" "}
            <Text fw="normal" span>
              {`${report.order.paymentInfo.brand} ${report.order.paymentInfo.card}`}
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
                ? report.order.details.deliveryInfo?.receiverdocumentkind || "-"
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
  );
};

export default SuccessMessage;
