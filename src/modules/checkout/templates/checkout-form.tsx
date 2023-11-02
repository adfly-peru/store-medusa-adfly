import {
  Stepper,
  ScrollArea,
  Modal,
  Loader,
  Center,
  Card,
  rem,
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

const CheckoutForm = () => {
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
    validate: {
      phone: (value) =>
        value?.length ?? 0 > 0 ? null : "Este campo es requerido",
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
      billingform.validate();
      if (billingform.isValid("phone")) {
        await editBilling(formValues);
        nextStep();
      }
    } else if (active === 1) {
      const formValues = deliveryform.values;
      if (cart) {
        await editDelivery(
          formValues,
          cart.deliveryInfo?.collaboratoraddress?.uuidcollaboratoraddress ?? ""
        );
      }
      nextStep();
    }
  };
  const funcOnPaymentButton = async (checked: string) => {
    billingform.clearErrors();
    if (checked === "bill") {
      let valids = 0;
      if ((billingform.values.ruc?.length ?? 0) == 0) {
        valids += 1;
        billingform.setFieldError("ruc", "RUC es obligatorio");
      }
      if ((billingform.values.businessname?.length ?? 0) <= 0) {
        valids += 1;
        billingform.setFieldError(
          "businessname",
          "Nombre de la empresa es obligatorio"
        );
      }
      if ((billingform.values.fiscaladdress?.length ?? 0) <= 0) {
        valids += 1;
        billingform.setFieldError(
          "fiscaladdress",
          "Dirección Fiscal es obligatoria"
        );
      }
      if (valids === 0) {
        return await editBilling(billingform.values);
      }
    } else {
      return await editBilling(billingform.values);
    }
    return "Complete los campos obligatorios";
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
      <Card withBorder>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint={0}
          styles={{
            steps: {
              paddingLeft: 50,
              paddingRight: 50,
            },
            stepIcon: {
              fontSize: 25,
              backgroundColor: "white",
              border: "2px solid #BCBCBC",
              color: "#BCBCBC",
              "&[data-completed]": {
                borderWidth: 0,
                backgroundColor: "#31658E",
                color: "white",
              },
              "&[data-progress]": {
                borderWidth: 0,
                backgroundColor: "#31658E",
                color: "white",
              },
            },
            step: {
              flexDirection: "column",
              width: 42,
            },
            stepBody: {
              margin: 0,
            },
            stepLabel: {
              marginTop: 5,
              fontSize: 16,
            },
            separator: {
              backgroundColor: "#BCBCBC",
              marginBottom: 20,
              height: 4,
              marginLeft: rem(-2),
              marginRight: rem(-2),
            },
            separatorActive: {
              backgroundColor: "#31658E",
            },
          }}
        >
          <Stepper.Step
            label="Información"
            allowStepSelect={active > 0}
            completedIcon={1}
          >
            {/* <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars> */}
            <InformationForm
              form={billingform}
              handleNextStep={handleNextStep}
            />
            {/* </ScrollArea> */}
          </Stepper.Step>
          <Stepper.Step
            label="Envío"
            allowStepSelect={active > 1}
            completedIcon={2}
          >
            <ScrollArea h={height / 1.5} w="100%" type="auto" offsetScrollbars>
              <ShippingInformation
                form={deliveryform}
                handleNextStep={handleNextStep}
                handlePrevStep={prevStep}
              />
            </ScrollArea>
          </Stepper.Step>
          <Stepper.Step
            label="Pago"
            allowStepSelect={active > 2}
            completedIcon={3}
          >
            <PaymentButton
              form={billingform}
              submitInfo={funcOnPaymentButton}
              handlePrevStep={prevStep}
            />
          </Stepper.Step>
        </Stepper>
      </Card>
      {/* <Group px={70} position="apart" grow mt="xl">
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
      </Group> */}
    </>
  );
};

export default CheckoutForm;
