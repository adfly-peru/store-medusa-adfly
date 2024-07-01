import { formatDate } from "@modules/common/functions/format-date";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CouponUsage, useCouponReportQuery } from "generated/graphql";
import { useRouter } from "next/router";
import CouponCard from "./CouponCard";

const CouponReport = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, loading } = useCouponReportQuery({ variables: { id } });
  const report = data?.collaboratorCouponUsage;

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
        </Typography>
        <Button
          variant="contained"
          sx={{
            alignSelf: "flex-start",
          }}
          onClick={() => router.push("/account/coupons")}
        >
          Volver
        </Button>
      </Stack>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={3}>
          <Stack>
            <Typography variant="h4">
              Fecha de Pedido:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {formatDate(report.dateused)}
              </Typography>
            </Typography>
            <Typography variant="h4">
              Código Cupón:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {report.couponcode}
              </Typography>
            </Typography>
            <Typography variant="h4">
              Vendido y entregado por:{" "}
              <Typography component="span" variant="body2" fontWeight={500}>
                {report.businessname}
              </Typography>
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h2" color="black">
              Productos
            </Typography>
            <Paper sx={{ padding: 2 }}>
              <CouponCard coupon={report as CouponUsage} />
            </Paper>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default CouponReport;
