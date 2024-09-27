import { SentimentDissatisfied } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import * as amplitude from "@amplitude/analytics-browser";
import { useEffect } from "react";

function formatarFecha(fechaStr: string): string {
  if (fechaStr.length !== 12) {
    throw new Error("Formato de fecha no válido.");
  }

  const año = "20" + fechaStr.slice(0, 2);
  const mes = fechaStr.slice(2, 4);
  const dia = fechaStr.slice(4, 6);
  const hora = fechaStr.slice(6, 8);
  const minuto = fechaStr.slice(8, 10);
  const segundo = fechaStr.slice(10, 12);

  const fecha = new Date(
    parseInt(año),
    parseInt(mes) - 1,
    parseInt(dia),
    parseInt(hora),
    parseInt(minuto),
    parseInt(segundo)
  );

  return fecha.toLocaleString();
}

const ErrorMessage = (props: {
  purchase: string[] | string | undefined;
  message: string[] | string | undefined;
  orderData: any;
}) => {
  const { purchase, message, orderData } = props;

  useEffect(() => {
    amplitude.track("Error on order process", { ...props });
  }, [props]);

  return (
    <Container>
      <Stack alignItems="center" fontSize={30}>
        <SentimentDissatisfied fontSize="inherit" />
        <Typography variant="h2" fontWeight={500} fontSize={24}>
          Ups! Ocurrió un error
        </Typography>
        {orderData ? (
          <Typography variant="body2">
            Transacción rechazada para el Pedido {purchase}
            <br />
            Fecha: {formatarFecha(orderData.TRANSACTION_DATE)}
            <br />
            Motivo del rechazo: {orderData.ACTION_DESCRIPTION}
            <br />
          </Typography>
        ) : (
          <Typography variant="body2">{message}</Typography>
        )}
      </Stack>
    </Container>
  );
};

export default ErrorMessage;
