import {
  Stack,
  Button,
  TextInput,
  Box,
  Space,
  Divider,
  Checkbox,
  Group,
  Title,
  FileInput,
  Alert,
  Anchor,
  Modal,
  Center,
  Loader,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAccount } from "@context/account-context";
import { ProfileForm } from "@interfaces/collaborator";
import { useState } from "react";
import { useRouter } from "next/router";

interface FormValues {
  name: string;
  lastname: string;
  documenttype: string;
  documentnumber: string;
  email: string;
  cellPhone: string;
  termsOfService: boolean;
  imgprofile: File | null;
}

const PersonalDataForm = () => {
  const router = useRouter();
  const { width } = useViewportSize();
  const { collaborator, verify } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: collaborator?.name ?? "",
      lastname: collaborator?.lastname ?? "",
      documenttype: collaborator?.documenttype ?? "",
      documentnumber: collaborator?.documentnumber ?? "",
      email: collaborator?.email ?? "",
      cellPhone: collaborator?.phonenumber ?? "",
      termsOfService: false,
      imgprofile: null,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      termsOfService: (val: boolean) =>
        val == true
          ? null
          : "Es obligatorio aceptar los Términos y Condiciones",
    },
  });

  const handleUpdate = async () => {
    form.validate();
    if (form.isValid()) {
      setLoading(true);
      try {
        const profileform: ProfileForm = {
          email: form.values.email,
          phone: form.values.cellPhone,
          image: form.values.imgprofile ?? undefined,
        };
        const res = await verify(profileform);
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

  if (!collaborator) {
    return <Loader />;
  }

  return (
    <>
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
      <Box sx={{ width: width / 3 }}>
        <Stack spacing="xs">
          {message != "" && (
            <Alert
              title={message == "success" ? "Felicidades!" : "Error!"}
              color={message == "success" ? "green" : "red"}
              onClose={() => setMessage("")}
              my="lg"
              withCloseButton
            >
              {message == "success"
                ? "Se ha actualizado el perfil de manera exitosa. Será redirigido a la página principal en unos segundos..."
                : message}
            </Alert>
          )}
          <Title>Perfil</Title>
          <Divider></Divider>
          <Title order={3}>Datos Personales</Title>

          <Group grow>
            <TextInput
              placeholder="Nombres (*)"
              label="Nombres"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Apellidos (*)"
              label="Apellidos"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("lastname")}
            />
          </Group>
          <Group grow>
            <TextInput
              placeholder="Tipo Documento"
              label="Tipo Documento"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("documenttype")}
            />
            <TextInput
              placeholder="Nro. Documento"
              label="Nro. Documento"
              radius="xs"
              size="sm"
              disabled
              withAsterisk
              {...form.getInputProps("documentnumber")}
            />
          </Group>
          <TextInput
            placeholder=""
            label="Correo Electrónico"
            radius="xs"
            size="sm"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <TextInput
            placeholder=""
            label="Celular"
            radius="xs"
            size="sm"
            {...form.getInputProps("cellPhone")}
          />
          <FileInput
            label="Imagen de Perfil"
            clearable
            accept="image/png,image/jpeg,image/jpg"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "420px",
            }}
            {...form.getInputProps("imgprofile")}
          />
          <Space h="md" />
          <Checkbox
            label={
              <>
                Acepto los{" "}
                <Anchor href="/terms" target="_blank">
                  Términos y Condiciones
                </Anchor>
              </>
            }
            {...form.getInputProps("termsOfService")}
          />
          <Checkbox
            label="Acepto recibir publicidad"
            {...form.getInputProps("acceptPublicity")}
          />
        </Stack>
        <Space h="md" />
        <Button color="gray" fullWidth size="lg" onClick={handleUpdate}>
          Actualizar
        </Button>
      </Box>
    </>
  );
};

export default PersonalDataForm;
