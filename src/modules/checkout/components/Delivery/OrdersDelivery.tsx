import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import ReceiverDetails from "./ReceiverDetails";
import Orders from "../Orders";
import { formatAddress } from "@modules/common/functions/format-place";
import { Icon } from "@iconify/react";
import { GetAddressesQuery } from "generated/graphql";
import { useState } from "react";

const OrdersDelivery = ({ data }: { data: GetAddressesQuery | undefined }) => {
  const [loading, setLoading] = useState(false);
  const {
    address: uuidaddress,
    setDeliveryStep,
    handleDeliveryInformation,
    ordersDeliveryInfo,
  } = useCheckout();

  const address = data?.collaboratoraddresses?.find(
    (adr) => adr.uuidcollaboratoraddress === uuidaddress
  );

  return (
    <Stack>
      <Typography variant="h3">Mis Direcciones</Typography>
      <Divider sx={(theme) => ({ borderColor: theme.palette.grey[300] })} />
      <Box position="relative">
        <Backdrop
          sx={(theme) => ({
            color: theme.palette.primary.main,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(1px)",
            borderRadius: 1,
          })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack>
          <Stack direction="row" spacing={1} alignItems="center" my={1}>
            <Icon icon="ph:house" width={30} />
            <Stack>
              <Typography variant="body2">
                {address?.alias ?? "Sin direccion de envio"}
              </Typography>
              {address && (
                <Typography variant="caption" fontSize={11}>
                  {address.address.split(",")[0]} <br />
                  {formatAddress(address)}
                </Typography>
              )}
            </Stack>
          </Stack>
          <ReceiverDetails />
          <Orders />
          <Stack mt={2} direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => setDeliveryStep(1)}
            >
              Regresar
            </Button>
            <Button
              disabled={Object.values(ordersDeliveryInfo).every((value) => {
                return value.selectedMethod === "";
              })}
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={async () => {
                setLoading(true);
                await handleDeliveryInformation();
                setLoading(false);
              }}
            >
              Continuar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default OrdersDelivery;
