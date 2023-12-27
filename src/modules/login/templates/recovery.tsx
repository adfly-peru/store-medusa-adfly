import {
  Text,
  Stack,
  Button,
  TextInput,
  Image,
  Space,
  Title,
  Loader,
  Alert,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { useEffect, useState } from "react";
import { useDesign } from "@context/design-context";
import * as amplitude from "@amplitude/analytics-browser";

const RecoveryPage = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginDesign } = useDesign();
  const { recoverPassword } = useAccount();
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (val) => (val === "" ? "Este campo es obligatorio" : null),
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    form.validate();
    if (form.isValid()) {
      const response = await recoverPassword(form.values.email);
      if (response.success) setMessage(response.message);
      else setError(response.message);
    } else {
      setError("Completa los campos obligatorios");
    }
    setLoading(false);
  };

  useEffect(() => {
    amplitude.track("User Go to Recovery Password with Token");
  }, []);

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
        <Text>Ingresa tu correo electrónico registrado</Text>
      </Stack>
      <Stack
        spacing="xl"
        px="sm"
        style={{
          fontSize: 16,
        }}
        align="center"
      >
        <TextInput
          placeholder="E-mail"
          radius="xs"
          size="md"
          w={320}
          disabled={message !== ""}
          {...form.getInputProps("email")}
        />
        {message === "" ? (
          <Button w={320} size="md" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Loader variant="dots" />
            ) : (
              <Text>Enviar Solicitud</Text>
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

export default RecoveryPage;
