import { useAccount } from "@context/account-context";
import * as amplitude from "@amplitude/analytics-browser";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import OrderReport from "@modules/account/components/Orders/DetailedOrder";
import { ChevronLeft, LocationCity } from "@mui/icons-material";

function formatarFecha(fechaStr: string): string {
  if (fechaStr?.length !== 12) {
    return "-";
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

const SuccessMessage = ({
  number,
  id,
  niubizData,
}: {
  number: string[] | string | undefined;
  id: string[] | string | undefined;
  niubizData: any;
}) => {
  const router = useRouter();
  const { collaborator } = useAccount();
  // useEffect(() => {
  //   getOrderReport();
  //   amplitude.track("Order Procesada");
  // }, []);

  return (
    <Container>
      <Stack m={4}>
        <Paper
          sx={{
            padding: 3,
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h1">{`¡Pedido Recibido! - # ${number}`}</Typography>
            <Typography variant="body2">
              <Typography
                variant="inherit"
                component="span"
                color="primary"
                fontWeight={600}
              >
                {collaborator?.name ?? ""}
              </Typography>
              , gracias por tu pedido.
            </Typography>
            <Typography variant="body2">
              Hemos recibido tu pedido N°{" "}
              <Typography
                variant="inherit"
                component="span"
                color="primary"
                fontWeight={600}
              >
                {number}
              </Typography>
              . El detalle de tu pedido ha sido enviado a{" "}
              <Typography
                variant="inherit"
                component="span"
                color="primary"
                fontWeight={600}
              >
                {collaborator?.email}
              </Typography>
              .
            </Typography>
            <Typography variant="body2">
              Estamos procesando tu pedido. Recibirás un correo de confirmación
              una vez confirmado el pedido.
            </Typography>
          </Stack>
        </Paper>
        <Stack direction="row" my={2} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => router.push("/home")}
            startIcon={<ChevronLeft />}
          >
            Regresar a la Tienda
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push(`/account/orders/${id}`)}
            endIcon={<LocationCity />}
          >
            Seguir mi Pedido
          </Button>
        </Stack>
        {/* <OrderReport orderId={id as string} /> */}
      </Stack>
    </Container>
  );
};

export default SuccessMessage;
