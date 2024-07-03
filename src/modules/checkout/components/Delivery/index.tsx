import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import SelectAddressTable from "./SelectAddressTable";
import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import OrdersDelivery from "./OrdersDelivery";
import { useGetAddressesQuery } from "generated/graphql";
import { useState } from "react";

const Delivery = () => {
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useGetAddressesQuery();
  const { address, deliveryStep, goToOrdersSection, setStep } = useCheckout();

  if (deliveryStep === 2) return <OrdersDelivery data={data} />;

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
          <SelectAddressTable
            data={data}
            refetch={async () => {
              await refetch();
            }}
          />
          <Stack mt={2} direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={() => setStep(1)}
            >
              Regresar
            </Button>
            <Button
              disabled={!address}
              variant="contained"
              sx={{
                width: "100%",
              }}
              onClick={async () => {
                setLoading(true);
                await goToOrdersSection(
                  data?.collaboratoraddresses.find(
                    (add) => add.uuidcollaboratoraddress === address
                  )?.department
                );
                setLoading(false);
              }}
            >
              Continuar
            </Button>
          </Stack>
          <Button
            sx={{
              alignSelf: "flex-end",
            }}
            onClick={() => goToOrdersSection(null)}
          >
            Continuar sin dirección de envio
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Delivery;
