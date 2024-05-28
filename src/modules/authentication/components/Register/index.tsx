import React from "react";
import { RegisterProvider, useRegister } from "./Context";
import ProviderModal from "./provider";
import FormModal from "./form";
import VerificationModal from "./verification";

const RegisterContent = () => {
  const { step } = useRegister();

  switch (step) {
    case 1:
      return <ProviderModal />;
    case 2:
      return <FormModal />;

    default:
      return <VerificationModal />;
  }
};

const RegisterModal = React.forwardRef<
  HTMLDivElement,
  {
    onClose: () => void;
  }
>((props, _) => {
  return (
    <RegisterProvider onClose={props.onClose}>
      <RegisterContent />
    </RegisterProvider>
  );
});

RegisterModal.displayName = "RegisterModal";

export default RegisterModal;
