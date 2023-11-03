import { useAccount } from "@context/account-context";
import { Stack, Button, Space, Text, Group, MediaQuery } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";

const VerifyEmailRegister = ({
  handleNextStep,
  handlePrevStep,
}: {
  handleNextStep: (() => void) | null;
  handlePrevStep: () => void;
}) => {
  const { collaborator } = useAccount();
  return (
    <MediaQuery
      smallerThan="sm"
      styles={{
        width: "100%",
      }}
    >
      <Stack w="80%" align="center">
        <Stack spacing="xs" align="center">
          <Text c="#31658E" fz={20} fw={700}>
            Verifica tu Correo
          </Text>
          <IconMail size={50} />
        </Stack>
        <Space />
        <Text fz={17} fw={300} align="center">
          Hemos enviado un correo de verificación a {collaborator?.email}.
          Revisa tu bandeja de entrada y carpetas de spam.
        </Text>
        <Text fz={17} fw={300} align="center">
          ¿No has recibido el correo? Reenviar verificación o Cambiar correo
        </Text>
        <Space h="md" />
        <Group position="center" w="100%">
          <MediaQuery
            smallerThan="sm"
            styles={{
              width: "45%",
            }}
          >
            <Button
              w={120}
              color="gray"
              size="md"
              fw={400}
              onClick={handlePrevStep}
            >
              Atras
            </Button>
          </MediaQuery>
          <MediaQuery
            smallerThan="sm"
            styles={{
              width: "45%",
            }}
          >
            <Button
              w={120}
              color="gray"
              size="md"
              fw={400}
              disabled={handleNextStep === null}
              onClick={() => handleNextStep!()}
            >
              Continuar
            </Button>
          </MediaQuery>
        </Group>
      </Stack>
    </MediaQuery>
  );
};

export default VerifyEmailRegister;
