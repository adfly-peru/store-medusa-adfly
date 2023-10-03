import {
  Stepper,
  ScrollArea,
  Group,
  Button,
  Modal,
  Loader,
  Center,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import InformationForm from "@modules/checkout/components/information-form";
import ShippingInformation from "@modules/checkout/components/shipping-information";
import PaymentButton from "../components/payment-button";
import { useAccount } from "@context/account-context";
import { useForm } from "@mantine/form";
import { BillingForm } from "@interfaces/billing";
import { useCart } from "@context/cart-context";
import { AddressInfoForm } from "@interfaces/address-interface";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const router = useRouter();
  const { height } = useViewportSize();
  const { collaborator } = useAccount();
  const { editBilling, editDelivery, cart, loadingEvent } = useCart();
  const [active, setActive] = useState(0);
  const billingform = useForm<BillingForm>({
    initialValues: {
      name: collaborator?.name ?? "",
      lastname: collaborator?.lastname ?? "",
      doctype: collaborator?.documenttype ?? "",
      doc: collaborator?.documentnumber ?? "",
      email: collaborator?.email ?? "",
      phone: cart?.billingInfo?.phone ?? collaborator?.phonenumber ?? "",
      ruc: cart?.billingInfo?.ruc ?? "",
      businessname: cart?.billingInfo?.businessname ?? "",
      fiscaladdress: cart?.billingInfo?.fiscaladdress ?? "",
    },
  });
  const deliveryform = useForm<AddressInfoForm>({
    initialValues: {
      receivername: cart?.deliveryInfo?.receivername ?? "",
      receiverdocumentkind: cart?.deliveryInfo?.receiverdocumentkind ?? "",
      receiverdocumentnumber: cart?.deliveryInfo?.receiverdocumentnumber ?? "",
      receiverphone: cart?.deliveryInfo?.receiverphone ?? "",
    },
  });
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const handleNextStep = async () => {
    if (active === 0) {
      const formValues = billingform.values;
      await editBilling(formValues);
    } else if (active === 1) {
      const formValues = deliveryform.values;
      if (cart) {
        await editDelivery(
          formValues,
          cart.deliveryInfo?.collaboratoraddress.uuidcollaboratoraddress ?? ""
        );
      }
    }
    nextStep();
  };
  return (
    <>
      <Modal
        opened={loadingEvent}
        withCloseButton={false}
        onClose={() => null}
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered
        size="xl"
      >
        <Center>
          <Loader />
        </Center>
      </Modal>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="Información" allowStepSelect={active > 0}>
          <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
            <InformationForm form={billingform} />
          </ScrollArea>
        </Stepper.Step>
        <Stepper.Step label="Envío" allowStepSelect={active > 1}>
          <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
            <ShippingInformation form={deliveryform} />
          </ScrollArea>
        </Stepper.Step>
        <Stepper.Step label="Pago" allowStepSelect={active > 2}>
          <PaymentButton
            form={billingform}
            submitInfo={async () => await editBilling(billingform.values)}
          />
        </Stepper.Step>
      </Stepper>
      <Group px={70} position="apart" grow mt="xl">
        <Button
          variant="light"
          onClick={
            active === 0 ? () => router.push("/checkout/mycart") : prevStep
          }
        >
          {active == 0 ? "Regresar a Carrito" : "Retroceder"}
        </Button>
        {active != 2 && (
          <Button variant="light" onClick={handleNextStep}>
            Continuar
          </Button>
        )}
      </Group>
    </>
  );
};

export default CheckoutForm;
