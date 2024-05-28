import { formatDate } from "@modules/common/functions/format-date";
import { Suborder, useOrderReportQuery } from "generated/graphql";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SubordersSection from "./SubordersSection";
import PaymentSection from "./PaymentSection";
import DeliverySection from "./DeliverySection";
import ResumeSection from "./ResumeSection";
import { useRouter } from "next/router";

const OrderReport = ({
  orderId,
  withBack,
}: {
  orderId: string;
  withBack?: boolean;
}) => {
  const router = useRouter();
  const { data, loading } = useOrderReportQuery({ variables: { id: orderId } });
  const report = data?.collaboratorOrder;

  if (loading) {
    return <CircularProgress />;
  }

  if (!report) return <div></div>;

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h2" color="black">
          Detalle Pedido{" "}
          <Typography variant="h2" component="span" color="primary">
            #
            {report.order.paymentInfo?.purchaseNumber ??
              report.order.starspurchasenumber ??
              "-"}
          </Typography>
        </Typography>
        {withBack && (
          <Button
            variant="contained"
            sx={{
              alignSelf: "flex-start",
            }}
            onClick={() => router.push("/account/orders")}
          >
            Volver
          </Button>
        )}
      </Stack>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack>
            <Typography variant="h4">
              Fecha de Pedido:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {formatDate(report.order.creationDate)}
              </Typography>
            </Typography>
            <Typography variant="h4">
              N° Pedido:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {report.order.paymentInfo?.purchaseNumber ??
                  report.order.starspurchasenumber ??
                  "-"}
              </Typography>
            </Typography>
            <Typography variant="h4">
              Total del Pedido:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {`S/.${report.order.finalTotal.toFixed(2)}`}
              </Typography>
            </Typography>
          </Stack>
          <SubordersSection suborders={report.order.suborders as Suborder[]} />
          <PaymentSection order={report.order} />
          <DeliverySection order={report.order} />
          <ResumeSection order={report.order} />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default OrderReport;
