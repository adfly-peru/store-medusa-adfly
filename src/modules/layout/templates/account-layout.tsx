import { ACCOUNT_STEPS, useAccount } from "@context/account-context";
import React from "react";
import { Center, Modal, Space, Stepper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { IconMailOpened, IconShieldCheck, IconUserCheck } from "@tabler/icons";

interface AccountProviderProps {
  children?: React.ReactNode;
}

const AccountLayout: React.FC<AccountProviderProps> = ({ children }) => {
  const { accountStep, updateStep, currentCustomer } = useAccount();

  const router = useRouter();

  const handleStepper = (stepIndex: number) => {
    if (stepIndex == 0 && accountStep == ACCOUNT_STEPS.UNCOMPLETE) {
      router.push("/account/profile");
    } else if (
      stepIndex == 1 &&
      accountStep == ACCOUNT_STEPS.PROFILECOMPLETED
    ) {
      updateStep(ACCOUNT_STEPS.VERIFIED);
    } else if (stepIndex == 2 && accountStep == ACCOUNT_STEPS.VERIFIED) {
      router.push("/account/security");
    }
  };

  return (
    <>
      <Modal
        opened={accountStep != ACCOUNT_STEPS.COMPLETED}
        onClose={() => null}
        overlayOpacity={0.55}
        overlayBlur={3}
        withCloseButton={false}
        centered={true}
        size="50%"
      >
        <Center>
          <Text sx={{ width: "75%" }} size="lg">
            Estás a 3 pasos de poder disfrutar de todos los benificios que
            tenemos para ti.
          </Text>
        </Center>
        <Space h="lg" />
        <Stepper active={accountStep} onStepClick={handleStepper}>
          <Stepper.Step
            icon={<IconUserCheck size={18} />}
            label="Completar tu perfil"
          ></Stepper.Step>
          <Stepper.Step
            icon={<IconMailOpened size={18} />}
            label="Verificar email"
          ></Stepper.Step>
          <Stepper.Step
            icon={<IconShieldCheck size={18} />}
            label="Actualizar Contraseña"
          ></Stepper.Step>
        </Stepper>
        <Space h="lg" />
        <Center>
          <Text sx={{ width: "75%" }} size="lg" align="justify">
            Acuérdate que no podrás acceder a la tienda hasta que completes
            todos los pasos anteriores. Si necesitas ayuda, escribenos a xx@xx o
            llamanos al +51 xxxxxxxxx.
          </Text>
        </Center>
        <Space h="md" />
        {accountStep == ACCOUNT_STEPS.PROFILECOMPLETED && (
          <Center>
            <Text sx={{ width: "75%" }} size="lg" align="justify">
              Hemos enviado un correo de verificación a {currentCustomer.email},
              revisa tu correo para completar tu perfil. Haz click{" "}
              <Text
                span
                c="blue"
                onClick={() => router.push("/account/profile")}
                inherit
              >
                aquí
              </Text>{" "}
              para cambiar tu dirección de correo electrónico.
            </Text>
          </Center>
        )}
      </Modal>
      {children}
    </>
  );
};

export default AccountLayout;
