import {
  Stack,
  Button,
  TextInput,
  Space,
  Text,
  Checkbox,
  Group,
  Title,
  Alert,
  Anchor,
  Modal,
  Center,
  Loader,
  Burger,
  MediaQuery,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useState } from "react";
import { useRouter } from "next/router";
import { IconMail } from "@tabler/icons-react";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
}

const VerifyEmailRegister = ({
  handleNextStep,
  handlePrevStep,
}: {
  handleNextStep: (() => void) | null;
  handlePrevStep: () => void;
}) => {
  return (
    <Stack w="80%" align="center">
      <Stack spacing="xs" align="center">
        <Text c="#31658E" fz={20} fw={700}>
          Verifica tu Correo
        </Text>
        <IconMail size={50} />
      </Stack>
      <Space />
      <Text fz={17} fw={300} align="center">
        Hemos enviado un correo de verificación a xxxxxx@xxxx.com. Revisa tu
        bandeja de entrada y carpetas de spam.
      </Text>
      <Text fz={17} fw={300} align="center">
        ¿No has recibido el correo? Reenviar verificación o Cambiar correo
      </Text>
      <Space h="md" />
      <Group position="center">
        <Button
          w={120}
          color="gray"
          size="md"
          fw={400}
          onClick={handlePrevStep}
        >
          Atras
        </Button>
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
      </Group>
    </Stack>
  );
};

export default VerifyEmailRegister;
