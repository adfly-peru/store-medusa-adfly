import { Paper, Stack, Typography } from "@mui/material";
import { OrderReportQuery } from "generated/graphql";

const DeliverySection = ({
  order,
}: {
  order: NonNullable<
    NonNullable<OrderReportQuery["collaboratorOrder"]>["order"]
  >;
}) => {
  return (
    <Stack>
      <Typography variant="h2" color="black">
        Información de Entrega
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">Entregar pedido a:</Typography>
        <Typography variant="body2">
          {`Nombre Completo: ${
            order.details?.isreceiver
              ? order.details?.deliveryInfo?.receivername || "-"
              : order.details?.collaborator?.name +
                " " +
                order.details?.collaborator?.lastname
          }`}
          <br />
          {`Tipo de Documento: ${
            order.details?.isreceiver
              ? order.details?.deliveryInfo?.receiverdocumentkind || "-"
              : order.details?.collaborator?.documenttype
          }`}
          <br />
          {`N° Documento: ${
            order.details?.isreceiver
              ? order.details?.deliveryInfo?.receiverdocumentnumber || "-"
              : order.details?.collaborator?.documentnumber
          }`}
          <br />
          {`Teléfono de Contacto: ${
            order.details?.isreceiver
              ? order.details?.deliveryInfo?.phone || "-"
              : order.details?.billingInfo?.phone
          }`}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default DeliverySection;
