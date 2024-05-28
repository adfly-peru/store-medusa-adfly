import { RegisterForm, registerRequest } from "api/auth";
import { signIn, useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";

interface IRegisterContext {
  registerForm: RegisterForm;
  setRegisterForm: (form: RegisterForm) => void;
  step: number;
  setStep: (step: number) => void;
  onClose: () => void;
  handleRegister: (form: RegisterForm) => Promise<void>;
}

const RegisterContext = createContext<IRegisterContext | null>(null);

export const RegisterProvider = ({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  onClose: () => void;
}) => {
  const { data: session } = useSession();
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    registerForm: "",
    old_password: "",
    new_password: "",
    phone: "",
    newsletters: false,
    terms: false,
    mode: "",
    token: "",
    uuidbusiness: session?.user?.uuidbusiness ?? "",
    document_number: session?.user?.dni ?? "",
    document_type: session?.user?.documenttype ?? "",
  });
  const [step, setStep] = useState(1);

  const handleRegister = async (form: RegisterForm) => {
    await registerRequest({
      ...form,
      old_password: form.mode === "password" ? form.document_number : "",
    });
    if (form.mode === "password") {
      setStep(3);
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        credential: form.document_number,
        mode: form.mode,
        token: form.token,
      });
      if (result?.ok) onClose();
    }
  };

  return (
    <RegisterContext.Provider
      value={{
        registerForm,
        setRegisterForm,
        step,
        setStep,
        onClose,
        handleRegister,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);

  if (context === null) {
    throw new Error("useRegister must be used within an RegisterProvider");
  }
  return context;
};
