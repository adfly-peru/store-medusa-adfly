import { Stack } from "@mui/material";
import BillingForm from "./BillingForm";
import StarsDetails from "./StarsDetails";
import PaymentMethods from "./PaymentMethods";

const PaymentStep = () => {
  return (
    <Stack spacing={2}>
      <BillingForm />
      <StarsDetails />
      <PaymentMethods />
    </Stack>
  );
};

export default PaymentStep;
