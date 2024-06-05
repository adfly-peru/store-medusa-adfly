import { useState } from "react";
import ProviderModal from "../components/login/provider";
import React from "react";
import ForgotPasswordModal from "../components/login/ForgotPassword";
import ForgotPasswordSendedModal from "../components/login/ForgotPasswordSended";
import RecoveryModal from "../components/login/RecoveryPassword";

const LoginModal = React.forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
  }
>((props, _) => {
  LoginModal.displayName = "LoginModal";
  const [step, setStep] = useState<
    "provider" | "forgot" | "forgot-send" | "success"
  >("provider");

  if (step === "provider")
    return (
      <ProviderModal
        onClose={props.closeModal}
        forgot={() => setStep("forgot")}
      />
    );
  if (step === "forgot")
    return (
      <ForgotPasswordModal
        onBack={() => setStep("provider")}
        nextStep={() => setStep("forgot-send")}
      />
    );
  if (step === "forgot-send")
    return <ForgotPasswordSendedModal onBack={() => setStep("provider")} />;
  return <div></div>;
});

export default LoginModal;
