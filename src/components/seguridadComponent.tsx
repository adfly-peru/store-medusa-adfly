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
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { ACCOUNT_STEPS, useAccount } from "@context/account-context";
import { useState } from "react";

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
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Incluye un símbolo especial" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const SeguridadComponent = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const { height, width } = useViewportSize();
  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confPassword: "",
    },
  });

  const [visible, { toggle }] = useDisclosure(false);
  const [password, setPassword] = useState({ campo: "" });
  const [password2, setPassword2] = useState({ campo: "" });
  const [validPassword, setValidPassword] = useState({ valido: false });

  const { updateStep } = useAccount();

  const validation = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setValidPassword({ valido: false });
        return "No coinciden";
      } else {
        setValidPassword({ valido: true });
      }
    }
  };

  const showError = () => {
    if (password2.campo.length > 0) {
      validation();
    }
  };

  return (
    <Box sx={{ width: width / 3 }}>
      <form
        onSubmit={form.onSubmit((values) =>
          updateStep(ACCOUNT_STEPS.COMPLETED)
        )}
      >
        <Stack spacing="xs">
          <Text>Seguridad</Text>
          <Divider></Divider>

          <TextInput label="Contraseña Actual" radius="xs" size="sm" />

          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transition="pop"
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  withAsterisk
                  label="Nueva Contraseña"
                  value={password.campo}
                  visible={visible}
                  onVisibilityChange={toggle}
                  onChange={(event) => {
                    setValue(event.currentTarget.value);
                    setPassword({ ...password, campo: event.target.value });
                  }}
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
                label="Incluye al menos 6 carácteres"
                meets={value.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            label="Confirmar Contraseña"
            radius="xs"
            size="sm"
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(e) =>
              setPassword2({ ...password2, campo: e.target.value })
            }
            onKeyUp={validation}
            onBlur={validation}
            error={validPassword.valido ? "" : "No coinciden"}
            withAsterisk
          />
        </Stack>

        <Space h="md" />

        <Button
          color="gray"
          fullWidth
          size="lg"
          type="submit"
          disabled={validPassword.valido != true ? true : false}
        >
          Actualizar
        </Button>
      </form>
    </Box>
  );
};

export default SeguridadComponent;
