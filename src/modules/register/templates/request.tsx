import { useAccount } from "@context/account-context";
import {
  Alert,
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Loader,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

const RequestModal = ({ businessname }: { businessname: string }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { requestAccess } = useAccount();
  const form = useForm({
    initialValues: {
      name: "",
      lastname: "",
      documenttype: "",
      documentnumber: "",
      termsOfService: false,
    },
    validate: {
      name: (val) => (val === "" ? "Este campo es obligatorio" : null),
      lastname: (val) => (val === "" ? "Este campo es obligatorio" : null),
      documenttype: (val) => (val === "" ? "Este campo es obligatorio" : null),
      documentnumber: (val) =>
        val === "" ? "Este campo es obligatorio" : null,
      termsOfService: (val: boolean) =>
        val === true
          ? null
          : "Es obligatorio aceptar los Términos y Condiciones",
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    form.validate();
    if (form.isValid()) {
      const response = await requestAccess(
        form.values.name,
        form.values.lastname,
        form.values.documenttype,
        form.values.documentnumber,
        form.values.termsOfService
      );
      if (response.success) {
        setMessage(response.message);
        amplitude.track("Request Sended");
      } else {
        setError(response.message);
        amplitude.track("Error while sending request");
      }
    } else {
      setError("Completa los campos obligatorios");
    }
    setLoading(false);
  };

  return (
    <>
      <Stack align="center" ta="center" px={20}>
        <Title
          c="#31658E"
          fz={25}
          style={{
            marginTop: -40,
            zIndex: 1000,
          }}
        >
          Solicitud de acceso
        </Title>
        <Space h="xs" />
      </Stack>
      <Divider py="md" size="md" w="100%" style={{ borderColor: "#31658E" }} />
      <Stack px={50} spacing={0}>
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
        <SimpleGrid
          cols={2}
          spacing="xl"
          breakpoints={[{ maxWidth: "48rem", cols: 1, spacing: "sm" }]}
          pb="lg"
        >
          <TextInput
            label="Nombres"
            withAsterisk
            disabled={message !== ""}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Apellidos"
            withAsterisk
            disabled={message !== ""}
            {...form.getInputProps("lastname")}
          />
          <Select
            data={[
              { value: "DNI", label: "DNI" },
              { value: "CE", label: "Carné extranjería" },
              { value: "passport", label: "Pasaporte" },
            ]}
            label="Tipo Documento"
            withAsterisk
            disabled={message !== ""}
            {...form.getInputProps("documenttype")}
          />
          <TextInput
            label="N° Documento"
            withAsterisk
            disabled={message !== ""}
            {...form.getInputProps("documentnumber")}
          />
        </SimpleGrid>
        {message === "" ? (
          <Checkbox
            label={
              <>
                Acepto los{" "}
                <Anchor href="/terms" target="_blank">
                  Términos y Condiciones
                </Anchor>
                de ADFLY y autorizo la política de privacidad.
              </>
            }
            {...form.getInputProps("termsOfService")}
          />
        ) : (
          <></>
        )}
        <Space h="xl" />
        <Center py="md">
          {message === "" ? (
            <Button
              style={{ borderRadius: "50rem" }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {" "}
              {loading ? <Loader variant="dots" /> : <Text>Enviar</Text>}
            </Button>
          ) : (
            <Text ta="center">{message}</Text>
          )}
        </Center>
        <Text ta="center" fz={12} py="sm">
          Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51 970
          802 065
        </Text>
        <Space h={15} />
      </Stack>
    </>
  );
};

export default RequestModal;
