import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { OrderReportQuery, Suborder } from "generated/graphql";
import SuborderInformation from "./Suborder";
import { OrderStatus, orderStatuses } from "@modules/common/types";

const PaymentSection = ({
  order,
}: {
  order: NonNullable<
    NonNullable<OrderReportQuery["collaboratorOrder"]>["order"]
  >;
}) => {
  return (
    <Stack>
      <Typography variant="h2" color="black">
        Información de Pago
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">
          Estado: {`${orderStatuses[order.status as OrderStatus]}`}
        </Typography>
        <Typography variant="h5">
          Comentarios: {order.comments || "-"}
        </Typography>
        <Divider
          sx={{
            borderColor: "black",
            margin: "10px 0",
          }}
        />
        <Typography variant="h5">
          Método de Pago:{" "}
          {`Pago ${
            (order.starsUsed ?? 0) > 0
              ? "con estrellas"
              : order.paymentInfo?.canal
          }`}
        </Typography>
        <Typography variant="h5">
          Detalle de Pago:{" "}
          {(order.starsUsed ?? 0) > 0
            ? `${order.starsUsed} estrellas`
            : `${order.paymentInfo?.brand} ${order.paymentInfo?.card}`}
        </Typography>
        <Divider
          sx={{
            borderColor: "black",
            margin: "10px 0",
          }}
        />
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">Facturación</Typography>
          </Grid>
          <Grid item xs={12} md={6} p={2}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-28px",
                  marginLeft: "-10px",
                }}
              >
                Comprobante Pago
              </InputLabel>
              <TextField
                disabled
                variant="outlined"
                value={order.details?.isbilling ? "Factura" : "Boleta"}
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} p={2}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-28px",
                  marginLeft: "-10px",
                }}
              >
                Nombre Completo / Razón Social
              </InputLabel>
              <TextField
                disabled
                variant="outlined"
                value={
                  order.details?.isbilling
                    ? order.details?.billingInfo?.businessname
                    : `${order.details?.collaborator?.name} ${order.details?.collaborator?.lastname}`
                }
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} p={2}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-28px",
                  marginLeft: "-10px",
                }}
              >
                Tipo Documento
              </InputLabel>
              <TextField
                disabled
                variant="outlined"
                value={
                  order.details?.isbilling
                    ? "RUC"
                    : order.details?.collaborator?.documenttype
                }
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} p={2}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-28px",
                  marginLeft: "-10px",
                }}
              >
                N° Documento
              </InputLabel>
              <TextField
                disabled
                variant="outlined"
                value={
                  order.details?.isbilling
                    ? order.details?.billingInfo?.ruc
                    : order.details?.collaborator?.documentnumber
                }
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} p={2}>
            <FormControl fullWidth required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-28px",
                  marginLeft: "-10px",
                }}
              >
                Dirección Facturación
              </InputLabel>
              <TextField
                disabled
                variant="outlined"
                value={
                  order.details?.isbilling
                    ? order.details?.billingInfo?.fiscaladdress
                    : ""
                }
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default PaymentSection;
