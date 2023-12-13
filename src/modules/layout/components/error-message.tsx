import { Center, Stack, ActionIcon, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconMoodSad } from "@tabler/icons-react";
import { useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";

function formatarFecha(fechaStr: string): string {
  if (fechaStr.length !== 12) {
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

const ErrorMessage = ({
  purchase,
  message,
  orderData,
}: {
  purchase: string[] | string | undefined;
  message: string[] | string | undefined;
  orderData: any;
}) => {
  const { width } = useViewportSize();

  useEffect(() => {
    amplitude.track("Order Procesada", {
      purchaseNumber: purchase,
      message,
      ...orderData,
    });
  }, []);

  return (
    <Center>
      <Stack align="center" fz={18}>
        <ActionIcon variant="transparent" disabled size={width / 8}>
          <IconMoodSad size={width / 8} />
        </ActionIcon>
        <Text fw={500} fz={24}>
          Ups! Ocurrió un error
        </Text>
        {orderData ? (
          <>
            <Text>Transacción rechazada para el Pedido {purchase}</Text>
            <Text>Fecha: {formatarFecha(orderData.TRANSACTION_DATE)}</Text>
            <Text>Motivo del rechazo: {orderData.ACTION_DESCRIPTION}</Text>
          </>
        ) : (
          <Text>{message}</Text>
        )}
      </Stack>
    </Center>
  );
};

export default ErrorMessage;
