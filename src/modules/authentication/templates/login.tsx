import { useState } from "react";
import ProviderModal from "../components/login/provider";
import React from "react";

const LoginModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
  }
>((props, _) => {
  LoginModal.displayName = "LoginModal";
  const [step, setStep] = useState<"provider" | "form" | "success">("provider");

  return (
    <ProviderModal
      onClose={props.closeModal}
      nextStep={() => setStep("form")}
    />
  );
});

export default LoginModal;
