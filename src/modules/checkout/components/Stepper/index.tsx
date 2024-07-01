import { useCheckout } from "@modules/checkout/context/CheckoutContext";
import { Stepper, Step, StepLabel } from "@mui/material";
import Delivery from "../Delivery";
import Information from "../Information";
import PaymentStep from "../Payment";

export const CheckoutStepper = () => {
  const { step } = useCheckout();

  return (
    <Stepper
      activeStep={step - 1}
      sx={{
        marginBottom: 2,
      }}
      alternativeLabel
    >
      <Step>
        <StepLabel>Información</StepLabel>
      </Step>
      <Step>
        <StepLabel>Envío</StepLabel>
      </Step>
      <Step>
        <StepLabel>Pago</StepLabel>
      </Step>
    </Stepper>
  );
};

export const StepperSection = () => {
  const { step } = useCheckout();

  if (step === 1) return <Information />;
  if (step === 2) return <Delivery />;
  return <PaymentStep />;
};
