import { useAccount } from "@context/account-context";
import {
  Alert,
  Button,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
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

const RegisterModal = ({
  businessname,
  goRequest,
}: {
  businessname: string;
  goRequest: () => void;
}) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAccount();
  const form = useForm({
    initialValues: {
      documenttype: "",
      documentnumber: "",
    },
    validate: {
      documenttype: (val) => (val === "" ? "Este campo es obligatorio" : null),
      documentnumber: (val) =>
        val === "" ? "Este campo es obligatorio" : null,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    form.validate();
    if (form.isValid()) {
      const response = await login({
        email: form.values.documentnumber,
        password: form.values.documentnumber,
      });
      setError(response);
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
          Regístrate aquí
        </Title>
        <Space h="md" />
        <Text c="#31658E" fz={15}>
          Para poder completar tu registro, {businessname} debe de brindarte
          acceso. Ingreso tu documento de identidad para confirmar si cuentas
          con acceso.
        </Text>
        <Space h="xs" />
      </Stack>
      <Divider py="md" size="md" w="100%" style={{ borderColor: "#31658E" }} />
      <Stack px={50}>
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
          <Select
            data={[
              { value: "DNI", label: "DNI" },
              { value: "CE", label: "Carné extranjería" },
              { value: "passport", label: "Pasaporte" },
            ]}
            label="Tipo Documento"
            withAsterisk
            {...form.getInputProps("documenttype")}
          />
          <TextInput
            label="N° Documento"
            withAsterisk
            {...form.getInputProps("documentnumber")}
          />
        </SimpleGrid>
        <Center>
          <Button
            style={{ borderRadius: "50rem" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader variant="dots" /> : <Text>Continuar</Text>}
          </Button>
        </Center>
        <Text ta="center" fz={12}>
          ¿No tienes acceso?{" "}
          <Text
            span
            component="a"
            onClick={() => goRequest()}
            style={{ cursor: "pointer" }}
            c="blue"
          >
            Envía una solicitud aquí
          </Text>
        </Text>
        <Space h={30} />
      </Stack>
    </>
  );
};

export default RegisterModal;
