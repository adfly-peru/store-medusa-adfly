import {
  Text,
  Stack,
  Button,
  TextInput,
  Box,
  Space,
  PasswordInput,
  Progress,
  Popover,
  Center,
  Loader,
  Modal,
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
import * as amplitude from "@amplitude/analytics-browser";

export const PasswordRequirement = ({
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

export const requirements = [
  { re: /[0-9]/, label: "Incluye un número" },
  { re: /[a-z]/, label: "Incluye una letra en minúscula" },
  { re: /[A-Z]/, label: "Incluye una letra en mayúscula" },
  // { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Incluye un símbolo especial" },
];

export const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

export const doesPasswordMeetRequirements = (password: string) => {
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
  const { collaborator, verify } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      newPassword: "",
      confPassword: "",
    },
    validate: {
      confPassword: (value, values) =>
        value !== values.newPassword ? "Las contraseñas no coinciden" : null,
    },
  });

  const strength = getStrength(form.values.newPassword);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const isPasswordValid = doesPasswordMeetRequirements(form.values.newPassword);

  const handleUpdate = async () => {
    form.validate();
    if (form.isValid() && collaborator?.documentnumber) {
      setLoading(true);
      try {
        const securityform: SecurityForm = {
          oldpassword: collaborator.documentnumber,
          newpassword: form.values.newPassword,
        };
        const res = await verify(undefined, securityform);
        setMessage(res ?? "success");
        if (!res) {
          amplitude.track("Step 3 Completed: Password Changed");
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
      <MediaQuery
        smallerThan="sm"
        styles={{
          width: "100%",
        }}
      >
        <Stack w="80%">
          <Stack spacing="xs">
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
                onClick={handleUpdate}
              >
                Finalizar
              </Button>
            </MediaQuery>
          </Group>
        </Stack>
      </MediaQuery>
    </Center>
  );
};

export default SecurityFormRegister;
