import { Stepper, ScrollArea, Group, Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import InformationForm from "@modules/checkout/components/information-form";
import ShippingInformation from "@modules/checkout/components/shipping-information";
import PaymentButton from "../components/payment-button";

const CheckoutForm = () => {
  const { height } = useViewportSize();
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Información" allowStepSelect={active > 0}>
          <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
            <InformationForm />
          </ScrollArea>
        </Stepper.Step>
        <Stepper.Step label="Envío" allowStepSelect={active > 1}>
          <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
            <ShippingInformation />
          </ScrollArea>
        </Stepper.Step>
        <Stepper.Step label="Pago" allowStepSelect={active > 2}>
          <PaymentButton />
        </Stepper.Step>
      </Stepper>
      <Group px={70} position="apart" grow mt="xl">
        <Button variant="light" onClick={prevStep}>
          {active == 0 ? "Regresar a Carrito" : "Retroceder"}
        </Button>
        {active != 2 && (
          <Button variant="light" onClick={nextStep}>
            Continuar
          </Button>
        )}
      </Group>
    </>
  );
};

export default CheckoutForm;
