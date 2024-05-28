import { Paper, Stack, Typography } from "@mui/material";
import { OrderReportQuery } from "generated/graphql";

const ResumeSection = ({
  order,
}: {
  order: NonNullable<
    NonNullable<OrderReportQuery["collaboratorOrder"]>["order"]
  >;
}) => {
  return (
    <Stack>
      <Typography variant="h2" color="black">
        Resumen del Pedido
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="body2">
          {`Sub total: S/.${(
            order.totalIgv +
            ((order.details?.cartdiscount ?? 0) +
              (order.details?.partnersdiscount ?? 0))
          ).toFixed(2)}`}
          <br />
          {`Envío: S/.${(order.deliveryPrice || 0).toFixed(2)}`}
          <br />
          {((order.details?.cartdiscount ?? 0) > 0 ||
            (order.details?.partnersdiscount ?? 0) > 0) && (
            <Typography
              component="span"
              variant="inherit"
              color="red"
            >{`Dscnto por promocion: - S/.${(
              (order.details?.cartdiscount ?? 0) +
              (order.details?.partnersdiscount ?? 0)
            ).toFixed(2)}`}</Typography>
          )}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {`Total del Pedido: S/.${order.finalTotal.toFixed(2)}`}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default ResumeSection;
