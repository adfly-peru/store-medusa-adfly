import {
  Text,
  Stack,
  Button,
  TextInput,
  Box,
  Space,
  Divider,
  PasswordInput,
  Progress,
  Popover,
  Center,
  Loader,
  Modal,
  Title,
  Alert,
  Burger,
  MediaQuery,
  Group,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { useState } from "react";
import { SecurityForm } from "@interfaces/collaborator";
import { useRouter } from "next/router";

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: "Incluye un número" },
  { re: /[a-z]/, label: "Incluye una letra en minúscula" },
  { re: /[A-Z]/, label: "Incluye una letra en mayúscula" },
  // { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Incluye un símbolo especial" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const doesPasswordMeetRequirements = (password: string) => {
  if (password.length <= 5) return false;
  for (const requirement of requirements) {
    if (!requirement.re.test(password)) {
      return false;
    }
  }
  return true;
};

const SecurityFormRegister = ({
  handlePrevStep,
}: {
  handlePrevStep: () => void;
}) => {
  const router = useRouter();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { verify } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confPassword: "",
    },
    validate: {
      currentPassword: (value) =>
        value.length > 0 ? null : "Este campo no puede estar vacío",
      confPassword: (value, values) =>
        value !== values.newPassword ? "Las contraseñas no coinciden" : null,
    },
  });

  const strength = getStrength(form.values.newPassword);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const isPasswordValid = doesPasswordMeetRequirements(form.values.newPassword);

  const handleUpdate = async () => {
    form.validate();
    if (form.isValid()) {
      setLoading(true);
      try {
        const securityform: SecurityForm = {
          oldpassword: form.values.currentPassword,
          newpassword: form.values.newPassword,
        };
        const res = await verify(undefined, securityform);
        setMessage(res ?? "success");
        if (!res) {
          const timerId = setTimeout(() => {
            router.push("/");
          }, 3000);
          return () => clearTimeout(timerId);
        }
      } catch (error) {
        setMessage("Ha ocurrido un error durante la verificación");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Center w="100%">
      <Modal
        opened={loading}
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
      <Stack w="80%">
        <Stack spacing="xs">
          <TextInput
            label="Contraseña Actual"
            radius="xs"
            size="sm"
            {...form.getInputProps("currentPassword")}
          />
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Nueva Contraseña"
                  {...form.getInputProps("newPassword")}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress
                color={color}
                value={strength}
                size={5}
                style={{ marginBottom: 10 }}
              />
              <PasswordRequirement
                label="Incluye al menos 8 carácteres"
                meets={form.values.newPassword.length > 7}
              />
              {requirements.map((requirement, index) => (
                <PasswordRequirement
                  key={index}
                  label={requirement.label}
                  meets={requirement.re.test(form.values.newPassword)}
                />
              ))}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            label="Confirmar Contraseña"
            withAsterisk
            {...form.getInputProps("confPassword")}
          />
        </Stack>

        <Space h="md" />
        <Group position="center">
          <Button
            w={130}
            color="gray"
            size="md"
            fw={400}
            onClick={handlePrevStep}
          >
            Atras
          </Button>
          <Button
            w={130}
            color="gray"
            size="md"
            fw={400}
            onClick={handleUpdate}
          >
            Finalizar
          </Button>
        </Group>
      </Stack>
    </Center>
  );
};

export default SecurityFormRegister;