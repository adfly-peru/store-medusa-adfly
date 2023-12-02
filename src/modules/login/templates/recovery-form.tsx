import {
  Text,
  Stack,
  Button,
  Image,
  Space,
  Title,
  Loader,
  Alert,
  Group,
  Popover,
  Progress,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { useState } from "react";
import { useDesign } from "@context/design-context";
import {
  PasswordRequirement,
  getStrength,
  requirements,
} from "@modules/account/components/security-form-register";

const RecoveryFormPage = ({ token }: { token: string }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginDesign } = useDesign();
  const { changePassword } = useAccount();
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

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    form.validate();
    if (form.isValid()) {
      //   const response = await changePassword(
      //     form.values.newPassword,
      //     form.values.newPassword,
      //     token
      //   );
      //   if (!response) setMessage("Contraseña actualiza de manera exitosa!");
      //   else setError(response);
    } else {
      setError("Completa los campos obligatorios");
    }
    setLoading(false);
  };

  return (
    <Stack>
      <Image
        radius="md"
        height={100}
        fit="contain"
        src={loginDesign?.logourl ?? ""}
        alt="Login Logo"
      />
      {error === "" ? (
        <></>
      ) : (
        <Alert
          mb="xl"
          withCloseButton
          title="Error al ingresar!"
          onClose={() => setError("")}
          color="red"
        >
          {error}
        </Alert>
      )}
      <Stack spacing="md" my="xl" align="center">
        <Title fz={20}>Recuperar contraseña</Title>
        <Text>Ingresa tu nueva contraseña</Text>
      </Stack>
      <Stack
        spacing="xl"
        px="sm"
        style={{
          fontSize: 16,
        }}
        align="center"
      >
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
                size="md"
                w={320}
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
          size="md"
          w={320}
          {...form.getInputProps("confPassword")}
        />
        {message === "" ? (
          <Button w={320} size="md" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Loader variant="dots" />
            ) : (
              <Text>Actualizar Contraseña</Text>
            )}
          </Button>
        ) : (
          <Text ta="center">{message}</Text>
        )}
        <Button w={320} size="md" bg="#5C6268" component="a" href="/login">
          Regresar
        </Button>
      </Stack>
      <Space h={100} />
      <Group align="center" position="center" spacing={0}>
        <Text color="gray.6">Por:</Text>
        <Image
          radius="md"
          p={0}
          height={80}
          width="inherit"
          fit="contain"
          src="/logo_adfly.svg"
          alt="Adfly"
          sx={{ padding: 10 }}
        />
      </Group>
    </Stack>
  );
};

export default RecoveryFormPage;
